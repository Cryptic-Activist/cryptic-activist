import { z } from 'zod';

export const CreateOffer = z
  .object({
    cryptocurrencyId: z.string().min(1),
    fiatId: z.string().min(1),
    offerType: z.string().min(1),
    paymentMethodId: z.string().min(1),
    pricingType: z.string().min(1),
    listAt: z.number(),
    limitMin: z.number(),
    limitMax: z.number(),
    timeLimit: z.number(),
    tags: z.array(z.string().min(1)),
    label: z.string().min(1),
    terms: z.string().min(1),
    instructions: z.string().min(1),
  })
  .superRefine(({ offerType, pricingType }, ctx) => {
    if (offerType !== 'buy' && offerType !== 'sell') {
      ctx.addIssue({
        code: 'custom',
        path: ['offerType'],
        message: "offerType must either 'buy' or 'sell'",
      });
    }
    if (pricingType !== 'fixed' && pricingType !== 'market') {
      ctx.addIssue({
        code: 'custom',
        path: ['pricingType'],
        message: "pricingType must either 'fixed' or 'market'",
      });
    }
  });
