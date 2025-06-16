import { ReviewStatus } from '@prisma/client';

export type SuspendUserOptions = {
  userId: string;
  moderatorId: string;
  reason: string;
  suspendedUntil?: Date; // leave undefined for permanent
  disputeId?: string;
};

export type LiftSuspensionOptions = {
  userId: string;
  liftedById: string;
  liftReason: string;
};

export type SendWarningInput = {
  userId: string;
  message: string;
  issuedByAdminId?: string;
  relatedDisputeId?: string;
};

export type CreateAccountReviewParams = {
  userId: string;
  reason: string;
  relatedDisputeId?: string;
  reviewerId?: string;
};

export type ResolveAccountReviewParams = {
  reviewId: string;
  resolutionNote: string;
  status: ReviewStatus;
  resolvedByAdminId: string;
};

export type EscalateDisputeParams = {
  disputeId: string;
  escalatedByAdminId: string;
  reason: string;
};

export type RequestMoreEvidenceParams = {
  disputeId: string;
  requestedFromId: string;
  description: string;
  moderatorId: string;
  deadlineHours?: number;
};
