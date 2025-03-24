import { isNumber } from '@/utils/string';
import { z } from 'zod';

export const CreateTrade = z.object({
  vendorId: z.string(),
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
    currentPrice: z.string(),
  })
  .superRefine(({ fiatAmount, currentPrice }, ctx) => {
    if (!isNumber(fiatAmount)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Fiat amount must be a number',
        path: ['fiatAmount'],
      });
    }
    if (!isNumber(currentPrice)) {
      ctx.addIssue({
        code: 'custom',
        message: 'currentPrice amount must be a number',
        path: ['currentPrice'],
      });
    }
  });
