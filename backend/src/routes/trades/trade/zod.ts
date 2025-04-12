import { isNumber } from '@/utils/string';
import { z } from 'zod';

export const CreateTrade = z
  .object({
    traderId: z.string(),
    vendorId: z.string(),
    offerId: z.string(),
    cryptocurrencyId: z.string(),
    fiatId: z.string(),
    cryptocurrencyAmount: z.number().gt(0),
    fiatAmount: z.number().gt(0),
    traderWalletAddress: z.string().min(1),
  })
  .superRefine(({ traderWalletAddress }, ctx) => {
    const regex = /^0x[a-fA-F0-9]{40}$/;
    if (!regex.test(traderWalletAddress)) {
      ctx.addIssue({
        code: 'custom',
        path: ['traderWalletId'],
        message: 'Invalid wallet address',
      });
    }
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
