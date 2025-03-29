import { DateType } from '@/functions/types';

export type AssociateUserToLanguageParams = {
  userId: string;
  languageId: string;
};

export type DisassociateUserToLanguageParams = {
  userId: string;
  languageId: string;
};

export type WhereUserLanguageParams = {
  id?: string;
  userId?: string;
  languageId?: string;
  isDeleted?: boolean;
  whenDeleted?: DateType;
  createdAt?: DateType;
  updatedAt?: DateType;
};
