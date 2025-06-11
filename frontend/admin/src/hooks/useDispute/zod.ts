import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const ZodDisputeResolution = z.object({
	resolutionType: z.string(),
	resolutionNote: z.string(),
	notifyBothUsers: z.boolean().optional(),
	logAdminAction: z.boolean().optional()
});

export const disputeResolutionResolver = zodResolver(ZodDisputeResolution);

export const ZodDisputeUserManagement = z.object({
	actionForTrader: z.string(),
	actionForVendor: z.string()
});

export const disputeUserManagementResolver = zodResolver(
	ZodDisputeUserManagement
);

export const ZodDisputeNotes = z.object({
	userId: z.string(),
	content: z.string()
});

export const disputeNotesResolver = zodResolver(ZodDisputeNotes);
