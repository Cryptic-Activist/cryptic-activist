import { UploadedFiles } from '@/hooks/useKYC/types';

export type SubmitKYCParams = {
  files: UploadedFiles;
  fullName: string;
  birthDate: string;
  nationality: string;
  documentType: string;
  documentNumber: string;
  additionalNotes?: string;
  consentProcessing: boolean;
  agreeTerms: boolean;
  userId: string;
};
