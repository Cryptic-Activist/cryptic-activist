import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

export const ZodPaymentMethod = z.object({
	name: z.string().min(2),
	paymentMethodCategory: z.object({
		id: z.string().min(1)
	})
});

export const paymentMethodResolver = zodResolver(ZodPaymentMethod);
