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
	actionForBuyer: z.string()
});

export const disputeUserManagementResolver = zodResolver(
	ZodDisputeUserManagement
);
