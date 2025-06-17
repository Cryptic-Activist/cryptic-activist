import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const PersonalInformation = z.object({
  fullName: z.string().min(5),
  birthDate: z.date(),
  nationality: z.string().min(4),
});

export const personalInformationResolver = zodResolver(PersonalInformation);

export const DocumentInformation = z.object({
  documentType: z.string().min(5),
  documentNumber: z.string().min(5),
});

export const documentInformationResolver = zodResolver(DocumentInformation);

export const DocumentUpload = z.object({
  documentFront: z.object({
    url: z.string().min(3),
  }),
  documentBack: z
    .object({
      url: z.string().min(3),
    })
    .optional(),
});

export const documentUploadResolver = zodResolver(DocumentUpload);

export const SelfieVerification = z.object({
  selfie: z.object({
    url: z.string().min(3),
  }),
});

export const selfieVerificationResolver = zodResolver(SelfieVerification);

export const AdditionalDocuments = z.object({
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
});

export const additionalDocumentsResolver = zodResolver(AdditionalDocuments);

export const TermsAndSubmit = z.object({
  agreeTerms: z.boolean(),
  consentProcessing: z.boolean(),
});

export const termsAndSubmitResolver = zodResolver(TermsAndSubmit);
