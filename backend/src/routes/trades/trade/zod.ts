import { isNumber } from '@/utils/string';
import { z } from 'zod';

export const CreateTrade = z.object({
  vendorId: z.string(),
  traderId: z.string(),
  offerId: z.string(),
  cryptocurrencyId: z.string(),
  fiatId: z.string(),
  cryptocurrencyAmount: z.number().gt(0),
  fiatAmount: z.number().gt(0),
});

export const GetTrade = z.object({
  id: z.string(),
});

export type CreateTradeType = z.infer<typeof CreateTrade>;

export const CalculateReceivingAmount = z
  .object({
    userId: z.string(),
    cryptocurrencyId: z.string(),
    fiatId: z.string(),
    fiatAmount: z.string(),
  })
  .superRefine(({ fiatAmount }, ctx) => {
    if (!isNumber(fiatAmount)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Fiat amount must be a number',
        path: ['fiatAmount'],
      });
    }
  });
