import {
  ZodCryptocurrency,
  ZodFiat,
  ZodInstructions,
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

const ethereumWalletAddressRegex = /^0x[a-fA-F0-9]{40}$/;

export const EditOFfer = z
  .object({
    fiat: ZodFiat,
    cryptocurrency: ZodCryptocurrency,
    offerType: ZodOfferType,
    paymentMethodId: ZodPaymentMethodId,
    paymentDetails: ZodPaymentDetails,
    pricingType: ZodPricingType,
    listAt: ZodListAt,
    limitMax: ZodLimitMax,
    limitMin: ZodLimitMin,
    timeLimit: ZodTimeLimit,
    tags: ZodTags,
    label: ZodLabel,
    terms: ZodTerms,
    instructions: ZodInstructions,
    vendorWalletAddress: ZodVendorWalletAddress,
  })
  .superRefine(({ offerType, pricingType, vendorWalletAddress }, ctx) => {
    if (offerType !== 'sell' && offerType !== 'buy') {
      ctx.addIssue({
        code: 'custom',
        message: "Offer type must be either 'sell' or 'buy'",
        path: ['offerType'],
      });
    }
    if (pricingType !== 'fixed' && pricingType !== 'market') {
      ctx.addIssue({
        code: 'custom',
        message: "Rate type must be either 'fixed' or 'market'",
        path: ['pricingType'],
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

export const editOfferResolver = zodResolver(EditOFfer);
