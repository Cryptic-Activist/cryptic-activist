import {
  CreateAccountReviewParams,
  EscalateDisputeParams,
  LiftSuspensionOptions,
  RequestMoreEvidenceParams,
  ResolveAccountReviewParams,
  SendWarningInput,
  SuspendUserOptions,
} from './types';

import { DisputeSeverity } from '@prisma/client';
import SystemMessage from '../systemMessage';
import { getRandomSeniorSuperAdmin } from '../admin';
import { prisma } from '../db';

export const suspendUser = async (options: SuspendUserOptions) => {
  const { userId, moderatorId, reason, suspendedUntil, disputeId } = options;

  // Create suspension entry
  const suspension = await prisma.userSuspension.create({
    data: {
      user: { connect: { id: userId } },
      reason,
      suspendedUntil,
      moderator: { connect: { id: moderatorId } },
      dispute: disputeId ? { connect: { id: disputeId } } : undefined,
    },
  });

  // Update user status
  await prisma.user.update({
    where: { id: userId },
    data: {
      isSuspended: true,
      suspensionId: suspension.id,
    },
  });

  return suspension;
};

export const liftSuspension = async (options: LiftSuspensionOptions) => {
  const { userId, liftedById, liftReason } = options;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { suspension: true },
  });

  if (!user?.suspension) {
    throw new Error('User is not currently suspended.');
  }

  await prisma.userSuspension.update({
    where: { id: user.suspension.id },
    data: {
      liftedAt: new Date(),
      liftedBy: { connect: { id: liftedById } },
      liftReason,
    },
  });

  await prisma.user.update({
    where: { id: userId },
    data: {
      isSuspended: false,
      suspensionId: null,
    },
  });
};

export const isUserSuspended = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      isSuspended: true,
      suspension: {
        select: {
          suspendedUntil: true,
          liftedAt: true,
        },
      },
    },
  });

  if (!user?.isSuspended) return false;

  const now = new Date();

  // Check if suspension has expired
  if (user.suspension?.suspendedUntil && user.suspension.suspendedUntil < now) {
    // Consider auto-lifting here if desired
    return false;
  }

  return true;
};

export const autoLiftExpiredSuspensions = async () => {
  const now = new Date();

  // Fetch all currently suspended users with expired suspension
  const expiredSuspensions = await prisma.userSuspension.findMany({
    where: {
      liftedAt: null,
      suspendedUntil: {
        lte: now,
      },
    },
    include: {
      user: true,
    },
  });

  for (const suspension of expiredSuspensions) {
    await prisma.$transaction([
      prisma.userSuspension.update({
        where: { id: suspension.id },
        data: {
          liftedAt: now,
          liftReason: 'Auto-lifted after expiration',
        },
      }),
      prisma.user.update({
        where: { id: suspension.userId },
        data: {
          isSuspended: false,
          suspensionId: null,
        },
      }),
    ]);

    console.log(`Suspension auto-lifted for user ${suspension.userId}`);
  }
};

export const getSuspensionDuration = async (
  severity: DisputeSeverity,
  userId: string,
) => {
  let baseDays = 0;

  const previousSuspensions = await prisma.userSuspension.count({
    where: {
      user: {
        id: userId,
      },
    },
  });

  switch (severity) {
    case DisputeSeverity.LOW:
      baseDays = 1;
      break;
    case DisputeSeverity.MEDIUM:
      baseDays = 3;
      break;
    case DisputeSeverity.HIGH:
      baseDays = 7;
      break;
    case DisputeSeverity.CRITICAL:
      baseDays = 30;
      break;
  }

  const repeatFactor = Math.min(previousSuspensions, 3); // cap multiplier
  return baseDays * (1 + repeatFactor); // e.g., 7 * (1 + 2) = 21 days for 2 previous suspensions
};

export const sendTradeDisputeUserWarning = async ({
  userId,
  message,
  issuedByAdminId,
  relatedDisputeId,
}: SendWarningInput) => {
  const systemMessage = new SystemMessage();

  await prisma.userWarning.create({
    data: {
      userId,
      message,
      issuedById: issuedByAdminId,
      relatedDisputeId,
    },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { totalWarnings: { increment: 1 } },
  });

  const trade = await prisma.trade.findFirst({
    where: {
      tradeDispute: {
        id: relatedDisputeId,
      },
    },
  });
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
    },
  });

  await systemMessage.sendWarningToUser({
    trade,
    user: user!,
    message,
  });
};

export const createAccountReview = async ({
  userId,
  reason,
  relatedDisputeId,
  reviewerId,
}: CreateAccountReviewParams) => {
  return await prisma.accountReview.create({
    data: {
      userId,
      reason,
      relatedDisputeId,
      reviewerId,
    },
  });
};

export const resolveAccountReview = async ({
  reviewId,
  resolutionNote,
  status, // ACTION_TAKEN | NO_ACTION_NEEDED
  resolvedByAdminId,
}: ResolveAccountReviewParams) => {
  return await prisma.accountReview.update({
    where: { id: reviewId },
    data: {
      status,
      resolutionNote,
      resolvedAt: new Date(),
      reviewerId: resolvedByAdminId,
    },
  });
};

export const escalateDispute = async ({
  disputeId,
  escalatedByAdminId,
  reason,
}: EscalateDisputeParams) => {
  try {
    const newSeniorAdmin = await getRandomSeniorSuperAdmin(true);

    console.log({ newSeniorAdmin });
    if (!newSeniorAdmin) return null;

    const transactions = await prisma.$transaction([
      // Update the dispute status and moderator
      prisma.tradeDispute.update({
        where: { id: disputeId },
        data: {
          status: 'ESCALATED',
          moderatorId: newSeniorAdmin.id,
        },
      }),
      // Create an audit log entry for the escalation
      prisma.disputeAuditLog.create({
        data: {
          disputeId,
          changedById: escalatedByAdminId,
          action: 'MANUAL_ESCALATION',
          note: reason,
        },
      }),
    ]);

    return transactions;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const requestMoreEvidence = async ({
  disputeId,
  requestedFromId,
  description,
  moderatorId,
  deadlineHours = 24,
}: RequestMoreEvidenceParams) => {
  try {
    const deadline = new Date(Date.now() + deadlineHours * 60 * 60 * 1000);
    const transactions = await prisma.$transaction([
      prisma.tradeDispute.update({
        where: { id: disputeId },
        data: {
          status: 'PENDING_EVIDENCE',
        },
      }),
      prisma.disputeEvidenceRequest.create({
        data: {
          requestedFromId,
          disputeId,
          description,
          requestedById: moderatorId,
          deadline,
          status: 'PENDING',
        },
      }),
    ]);

    return transactions;
  } catch (error) {
    console.log(error);
    return null;
  }
};
