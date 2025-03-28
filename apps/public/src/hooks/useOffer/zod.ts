import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const regex = /[^0-9.]/g;

export const HowMuch = z
  .object({
    amount: z.string().min(1),
  })
  .superRefine(({ amount }, ctx) => {
    if (!amount.match(regex)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Only numbers are allowed',
        path: ['amount'],
      });
    }
  });

export const howMuchResolver = zodResolver(HowMuch);
