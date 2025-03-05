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
