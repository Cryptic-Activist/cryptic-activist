import {
  ZodCryptocurrency,
  ZodFiat,
  ZodInstructions,
  ZodLabel,
  ZodLimitMax,
  ZodLimitMin,
  ZodListAt,
  ZodOfferType,
  ZodPaymentMethodId,
  ZodTags,
  ZodTerms,
  ZodTimeLimit,
  ZodTradePricingType,
} from '@/layouts/sections/offer/create/zod';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const CreateOfferPaymentMethod = z
  .object({
    fiat: ZodFiat,
    cryptocurrency: ZodCryptocurrency,
    offerType: ZodOfferType,
    paymentMethodId: ZodPaymentMethodId,
  })
  .superRefine(({ offerType }, ctx) => {
    if (offerType !== 'sell' && offerType !== 'buy') {
      ctx.addIssue({
        code: 'custom',
        message: "Offer type must be either 'sell' or 'buy'",
        path: ['offerType'],
      });
    }
  });

export const createOfferPaymentMethodResolver = zodResolver(
  CreateOfferPaymentMethod
);

export const CreateOfferTradePricing = z
  .object({
    tradePricingType: ZodTradePricingType,
    listAt: ZodListAt,
    limitMax: ZodLimitMax,
    limitMin: ZodLimitMin,
    timeLimit: ZodTimeLimit,
  })
  .superRefine(({ tradePricingType }, ctx) => {
    if (tradePricingType !== 'fixed' && tradePricingType !== 'market') {
      ctx.addIssue({
        code: 'custom',
        message: "Rate type must be either 'fixed' or 'market'",
        path: ['tradePricingType'],
      });
    }
  });

export const createOfferTradePricing = zodResolver(CreateOfferTradePricing);

export const CreateOfferTradeInstructions = z.object({
  tags: ZodTags,
  label: ZodLabel,
  terms: ZodTerms,
  instructions: ZodInstructions,
});

export const createOfferTradeInstructions = zodResolver(
  CreateOfferTradeInstructions
);
