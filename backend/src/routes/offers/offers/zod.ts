import { z } from 'zod';

export const GetOffers = z.object({
  offerType: z.string().min(2).optional(),
  cryptocurrencyId: z.string().min(2).optional(),
  paymentMethodId: z.string().min(2).optional(),
  fiatId: z.string().min(2).optional(),
});

export const GetOffersPagination = z.object({
  limit: z.number(),
  offset: z.number(),
  offerType: z.string().min(2).optional(),
  cryptocurrencyId: z.string().min(2).optional(),
  paymentMethodId: z.string().min(2).optional(),
  fiatId: z.string().min(2).optional(),
});
