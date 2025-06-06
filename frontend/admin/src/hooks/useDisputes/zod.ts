import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const ZodTradesFilters = z.object({
	status: z.string().optional(),
	cryptocurrencyId: z.string().optional(),
	dateRangeStart: z.date().optional(),
	dateRangeEnd: z.date().optional(),
	amount: z.string().optional(),
	username: z.string().optional()
});

export const tradesFiltersResolver = zodResolver(ZodTradesFilters);
