import { z } from 'zod';

const ethereumWalletAddressRegex = /^0x[a-fA-F0-9]{40}$/;

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
    vendorWalletAddress: z.string().min(2),
  })
  .superRefine(({ offerType, pricingType, vendorWalletAddress }, ctx) => {
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
    if (!ethereumWalletAddressRegex.test(vendorWalletAddress)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Must be a valid wallet address',
        path: ['vendorWalletAddress'],
      });
    }
  });

export const EditOffer = z
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
    vendorWalletAddress: z.string().min(2),
  })
  .superRefine(({ offerType, pricingType, vendorWalletAddress }, ctx) => {
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
    if (!ethereumWalletAddressRegex.test(vendorWalletAddress)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Must be a valid wallet address',
        path: ['vendorWalletAddress'],
      });
    }
  });
