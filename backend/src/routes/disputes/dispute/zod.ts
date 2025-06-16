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

export const RequestMoreEvidences = z
  .object({
    disputeId: z.string().min(1),
    requestedFrom: z.string().min(1),
  })
  .superRefine(({ requestedFrom }, ctx) => {
    if (requestedFrom !== 'vendor' && requestedFrom !== 'trader') {
      ctx.addIssue({
        code: 'custom',
        message: "requestedForm must be 'vendor' or 'trader'",
        path: ['requestedFrom'],
      });
    }
  });

export const AddMoreEvidences = z.object({
  disputeId: z.string().min(1),
  evidences: z.array(
    z.object({
      fileName: z.string().min(1),
      url: z.string().min(1),
    }),
  ),
  userId: z.string().min(1),
});
