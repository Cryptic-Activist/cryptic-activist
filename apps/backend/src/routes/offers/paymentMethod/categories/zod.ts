import { z } from 'zod';

export const CreatePaymentMethodCategory = z.object({
  name: z.string().min(1),
});
