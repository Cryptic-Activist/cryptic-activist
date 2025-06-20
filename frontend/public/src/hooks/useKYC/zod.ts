import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const KYCForm = z.object({
  fullName: z.string().min(5),
  birthDate: z.date(),
  nationality: z.string().min(4),
  documentType: z.string().min(5),
  documentNumber: z.string().min(5),
  documentFront: z.object({
    url: z.string().min(3),
  }),
  documentBack: z
    .object({
      url: z.string().min(3),
    })
    .optional(),
  selfie: z.object({
    url: z.string().min(3),
  }),
  utilityBill: z
    .object({
      url: z.string().min(3),
    })
    .optional(),
  bankStatement: z
    .object({
      url: z.string().min(3),
    })
    .optional(),
  additionalNotes: z.string().min(4).optional(),
  agreeTerms: z.boolean(),
  consentProcessing: z.boolean(),
});

export const KYCFormResolver = zodResolver(KYCForm);
