import { z } from 'zod';

export const SubmitKYC = z.object({
  files: z.array(
    z.object({
      type: z.string().min(1, 'type is required'),
      file: z.object({
        fileName: z.string().min(1, 'fileName is required'),
        size: z.number().min(1, 'size is required'),
        mimeType: z.string().min(1, 'mimeType is required'),
        key: z.string().min(1, 'key is required'),
      }),
    }),
  ),
  fullName: z.string().min(1, 'Full name is required'),
  birthDate: z.string().min(1, 'Birth date is required'),
  nationality: z.string().min(1, ''),
  documentType: z.string().min(1, 'Document type is required'),
  documentNumber: z.string().min(1, 'Document number is required'),
  additionalNotes: z.string().optional(),
  consentProcessing: z.boolean().refine((val) => val, {
    message: 'Consent for processing is required',
  }),
  agreeTerms: z.boolean().refine((val) => val, {
    message: 'You must agree to the terms and conditions',
  }),
  userId: z.string().min(1, 'User ID is required'),
});
