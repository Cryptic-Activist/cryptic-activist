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
    page: z.string().min(1),
    pageSize: z.string().min(1),
  })
  .superRefine(({ page, pageSize }, ctx) => {
    const regex = /^\d+$/;
    if (!regex.test(page)) {
      ctx.addIssue({
        code: 'custom',
        path: ['page'],
        message: 'page must be number',
      });
    }
    if (!regex.test(pageSize)) {
      ctx.addIssue({
        code: 'custom',
        path: ['pageSize'],
        message: 'pageSize must be number',
      });
    }
  });
