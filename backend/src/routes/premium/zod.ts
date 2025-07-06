import { isAddress } from 'ethers';
import { z } from 'zod';

export const SubscribeBody = z
  .object({
    userId: z.string().min(1),
    period: z.string().min(1),
    payerAddress: z.string().min(1),
  })
  .superRefine(({ period, payerAddress }, ctx) => {
    if (period !== 'MONTHLY' && period !== 'YEARLY') {
      ctx.addIssue({
        code: 'custom',
        path: ['period'],
        message: "period must be either 'MONTHLY' or 'YEARLY'",
      });
    }
    if (!isAddress(payerAddress)) {
      ctx.addIssue({
        code: 'custom',
        path: ['payerAddress'],
        message: 'payerAddress must be a valid Ethereum address',
      });
    }
  });
