import { z } from 'zod';

export const IndexPagination = z.object({
  limit: z
    .string()
    .transform(Number)
    .refine((number) => number >= 0)
    .optional(),
  skip: z
    .string()
    .transform(Number)
    .refine((number) => number >= 0)
    .optional(),
  paymentMethodType: z.string().min(3).optional(),
  fiatId: z.string().min(15).optional(),
  cryptocurrencyId: z.string().min(15).optional(),
  paymentMethodId: z.string().min(15).optional(),
});
