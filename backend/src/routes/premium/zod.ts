import { z } from 'zod';

export const SubscribeBody = z
  .object({
    userId: z.string().min(1),
    period: z.string().min(1),
  })
  .superRefine(({ period }, ctx) => {
    if (period !== 'monthly' && period !== 'yearly') {
      ctx.addIssue({
        code: 'custom',
        path: ['period'],
        message: "period must be either 'montly' or 'yearly'",
      });
    }
  });
