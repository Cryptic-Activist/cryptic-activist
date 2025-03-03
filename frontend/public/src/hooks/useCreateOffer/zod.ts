import {
  ZodCryptocurrency,
  ZodFiat,
  ZodOfferType,
  ZodPaymentMethodId,
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
