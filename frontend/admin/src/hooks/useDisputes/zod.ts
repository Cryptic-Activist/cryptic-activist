import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const ZodDisputesFilters = z.object({
	status: z.string().optional(),
	severity: z.string().optional(),
	type: z.string().optional(),
	amount: z.string().optional(),
	moderatorId: z.string().optional()
});

export const disputesFiltersResolver = zodResolver(ZodDisputesFilters);
