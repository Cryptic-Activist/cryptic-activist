import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const ZodKYCsFilters = z.object({
	status: z.string().optional(),
	username: z.string().optional()
});

export const kycsFiltersResolver = zodResolver(ZodKYCsFilters);
