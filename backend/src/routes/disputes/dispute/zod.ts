import { z } from 'zod';

export const AddDisputePartyNote = z.object({
  disputeId: z.string().min(1),
  userId: z.string().min(1),
  adminId: z.string().min(1),
  content: z.string().min(1),
});

export const GetPreviousDisputePartyNote = z.object({
  traderId: z.string().min(1),
  vendorId: z.string().min(1),
});

export const AddResolutionDecision = z.object({
  disputeId: z.string().min(1),
  resolutionType: z.string().min(1),
  resolutionNote: z.string().min(1),
  notifyBothUsers: z.boolean(),
  logAdminAction: z.boolean(),
});

export const ResolveInFavor = z.object({
  disputeId: z.string().min(1),
});
