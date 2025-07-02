import { z } from 'zod';

export const GetSupportedTokens = z
  .object({
    chainId: z.string().min(1),
  })
  .superRefine(({ chainId }, ctx) => {
    const parsed = Number(chainId);

    if (!Number.isInteger(parsed) || isNaN(parsed)) {
      ctx.addIssue({
        path: ['chainId'],
        code: 'custom',
        message: 'chainId must be an integer number',
      });
    }
  });
