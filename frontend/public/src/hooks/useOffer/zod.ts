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

export const StartTrade = z.object({
  cryptocurrencyAmount: z.number().min(0),
  fiatAmount: z.number().min(0),
  offerId: z.string().min(1),
  traderId: z.string().min(1),
  fiatId: z.string().min(1),
  vendorId: z.string().min(1),
  cryptocurrencyId: z.string().min(1),
  paymentMethodId: z.string().min(1),
  traderWalletAddress: z.string().min(1),
});
