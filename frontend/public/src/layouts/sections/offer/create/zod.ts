import { z } from 'zod';

export const ZodFiat = z.object({
  id: z.string().min(2),
  name: z.string().min(2),
  symbol: z.string().min(2),
});
export const ZodCryptocurrency = z.object({
  coingeckoId: z.string().min(2),
  id: z.string().min(2),
  name: z.string().min(2),
  symbol: z.string().min(2),
});
export const ZodOfferType = z.string().min(3);
export const ZodPaymentMethodId = z.string().min(2);
export const ZodPricingType = z.string().min(1);
export const ZodListAt = z.number().min(1);
export const ZodLimitMax = z.number().min(1);
export const ZodLimitMin = z.number().min(1);
export const ZodTimeLimit = z.number().min(1);
export const ZodTags = z.array(z.string());
export const ZodLabel = z.string().min(1);
export const ZodTerms = z.string().min(1);
export const ZodInstructions = z.string().min(1);
export const ZodVendorWalletAddress = z.string().min(2);
