import {
  ZodChain,
  ZodCryptocurrency,
  ZodFiat,
  ZodInstructions,
  ZodKYCOnly,
  ZodLabel,
  ZodLimitMax,
  ZodLimitMin,
  ZodListAt,
  ZodOfferType,
  ZodPaymentDetails,
  ZodPaymentMethodId,
  ZodPricingType,
  ZodTags,
  ZodTerms,
  ZodTimeLimit,
  ZodVendorWalletAddress,
} from '@/layouts/sections/offer/create/zod';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const CreateOfferPaymentMethod = z
  .object({
    fiat: ZodFiat,
    cryptocurrency: ZodCryptocurrency,
    chain: ZodChain,
    offerType: ZodOfferType,
    paymentMethodId: ZodPaymentMethodId,
    paymentDetails: ZodPaymentDetails,
    vendorWalletAddress: ZodVendorWalletAddress,
  })
  .superRefine(({ offerType, vendorWalletAddress }, ctx) => {
    if (offerType !== 'sell' && offerType !== 'buy') {
      ctx.addIssue({
        code: 'custom',
        message: "Offer type must be either 'sell' or 'buy'",
        path: ['offerType'],
      });
    }
    if (!ethereumWalletAddressRegex.test(vendorWalletAddress)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Must be a valid wallet address',
        path: ['vendorWalletAddress'],
      });
    }
  });

export const createOfferPaymentMethodResolver = zodResolver(
  CreateOfferPaymentMethod
);

export const CreateOfferTradePricing = z
  .object({
    pricingType: ZodPricingType,
    listAt: ZodListAt,
    limitMax: ZodLimitMax,
    limitMin: ZodLimitMin,
    timeLimit: ZodTimeLimit,
  })
  .superRefine(({ pricingType }, ctx) => {
    if (pricingType !== 'fixed' && pricingType !== 'market') {
      ctx.addIssue({
        code: 'custom',
        message: "Rate type must be either 'fixed' or 'market'",
        path: ['pricingType'],
      });
    }
  });

export const createOfferTradePricing = zodResolver(CreateOfferTradePricing);

const ethereumWalletAddressRegex = /^0x[a-fA-F0-9]{40}$/;

export const CreateOfferTradeInstructions = z.object({
  tags: ZodTags,
  kycOnly: ZodKYCOnly,
  label: ZodLabel,
  terms: ZodTerms,
  instructions: ZodInstructions,
});

export const createOfferTradeInstructions = zodResolver(
  CreateOfferTradeInstructions
);
