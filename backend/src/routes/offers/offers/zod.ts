import { z } from 'zod';

export const GetOffers = z.object({
  offerType: z.string().min(2).optional(),
  cryptocurrencyId: z.string().min(2).optional(),
  paymentMethodId: z.string().min(2).optional(),
  fiatId: z.string().min(2).optional(),
});

export const GetCurrentVendorOffers = z.object({
  id: z.string().min(2),
});

export const GetOffersPagination = z
  .object({
    limit: z.string(),
    cursor: z.string().optional(),
    offerType: z.string().min(2).optional(),
    cryptocurrencyId: z.string().min(2).optional(),
    paymentMethodIds: z.string().optional(),
    fiatId: z.string().min(2).optional(),
    excludedVendorId: z.string().min(2).optional(),
  })
  .superRefine(({ limit }, ctx) => {
    const regex = /^\d+$/;
    if (!regex.test(limit)) {
      ctx.addIssue({
        code: 'custom',
        path: ['limit'],
        message: 'limit must be number',
      });
    }
  });

export const GetMyOffersPagination = z
  .object({
    limit: z.string(),
    cursor: z.string().optional(),
    offerType: z.string().min(2).optional(),
  })
  .superRefine(({ limit }, ctx) => {
    const regex = /^\d+$/;
    if (!regex.test(limit)) {
      ctx.addIssue({
        code: 'custom',
        path: ['limit'],
        message: 'limit must be number',
      });
    }
  });
