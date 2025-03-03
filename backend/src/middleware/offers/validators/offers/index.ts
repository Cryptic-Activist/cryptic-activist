import { z } from 'zod';

export const CreateOffer = z.object({
  vendorId: z.string(),
  cryptocurrency: z.object({
    coingeckoId: z.string(),
    id: z.string(),
    name: z.string(),
    symbol: z.string(),
  }),
  fiat: z.object({
    id: z.string(),
    name: z.string(),
    symbol: z.string(),
  }),
  paymentMethodId: z.string(),
  paymentMethodType: z.string(),
  tradeInstructionsInstructions: z.string(),
  tradeInstructionsLabel: z.string(),
  tradeInstructionsTags: z.array(z.string()).max(5),
  tradePricingListAt: z.number().min(0),
  tradePricingTimeLimit: z.number().min(10),
  tradePricingTradeLimitsMax: z.number(),
  tradePricingTradeLimitsMin: z.number(),
  tradePricingType: z.string(),
});

export type CreateOfferType = z.infer<typeof CreateOffer>;
