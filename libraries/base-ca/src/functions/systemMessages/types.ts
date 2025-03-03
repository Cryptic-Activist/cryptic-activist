import { DateType } from '@/functions/types';

import { GetLanguageReturnType } from '../languages/types';

export type CreateSystemMessageParams = {
  message: string;
  url: string;
  userId: string;
};

export type WhereSystemMessageParams = {
  id?: string;
  profileColor?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  privateKeys?: string;
  isVerified?: boolean;
  isDeleted?: boolean;
  whenDeleted?: DateType;
  createdAt?: DateType;
  updatedAt?: DateType;
};

export type SystemMessageDynamicType = WhereSystemMessageParams;

export type SystemMessageAssociationsType = {
  User?: boolean;
};

export type GetSystemMessageReturnType = {
  id: string;
  profileColor: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  privateKeys: string[];
  isVerified: boolean;
  isDeleted: boolean;
  whenDeleted: DateType;
  createdAt: DateType;
  updatedAt: DateType;
  languages?: GetLanguageReturnType[];
};
