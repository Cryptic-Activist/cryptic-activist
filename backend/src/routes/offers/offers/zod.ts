import { z } from 'zod';

export const GetOffers = z.object({
  offerType: z.string().min(2).optional(),
  cryptocurrencyId: z.string().min(2).optional(),
  paymentMethodId: z.string().min(2).optional(),
  fiatId: z.string().min(2).optional(),
});

export const GetOffersPagination = z
  .object({
    limit: z.string(),
    offset: z.string(),
    offerType: z.string().min(2).optional(),
    cryptocurrencyId: z.string().min(2).optional(),
    paymentMethodId: z.string().min(2).optional(),
    fiatId: z.string().min(2).optional(),
    excludedVendorId: z.string().min(2).optional(),
  })
  .superRefine(({ limit, offset }, ctx) => {
    const regex = /^\d+$/;
    if (!regex.test(limit)) {
      ctx.addIssue({
        code: 'custom',
        path: ['limit'],
        message: 'limit must be number',
      });
    }
    if (!regex.test(offset)) {
      ctx.addIssue({
        code: 'custom',
        path: ['offset'],
        message: 'offset must be number',
      });
    }
  });
