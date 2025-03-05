import { DateType } from '@/functions/types';

export type CreateLanguageParams = {
  name: string;
};

export type LanguageDynamicType = {
  id?: string;
  name?: string;
  isDeleted?: boolean;
  whenDeleted?: DateType;
  createdAt?: DateType;
  updatedAt?: DateType;
};

export type UpdateLanguageWhereType = LanguageDynamicType;

export type UpdateLanguageToUpdateType = LanguageDynamicType;

export type DeleteLanguageWhereType = LanguageDynamicType;

export type GetLanguageWhereType = LanguageDynamicType;

export type GetLanguageReturnType = {
  id: string;
  name: string;
  isDeleted: boolean;
  whenDeleted: DateType;
  createdAt: DateType;
  updatedAt: DateType;
};
