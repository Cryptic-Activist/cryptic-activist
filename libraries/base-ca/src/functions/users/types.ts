import { DateType } from '@/functions/types';
import { Prisma } from '@prisma/client';

import { GetLanguageReturnType } from '../languages/types';

export type CreateUserParams = {
  profileColor: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  privateKeys: string[];
};

export type WhereUserParams = {
  id?: string;
  profileColor?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  privateKeys?: string[];
  isVerified?: boolean;
  isDeleted?: boolean;
  whenDeleted?: DateType;
  createdAt?: DateType;
  updatedAt?: DateType;
};

export type FullTextUserValues = {
  contains: string;
  mode: 'insensitive' | 'sensitive';
};

export type FullTextUser = {
  [key: string]: FullTextUserValues;
};

export type WhereUserFullTextParams = {
  AND?: FullTextUser[];
  OR?: FullTextUser[];
};

export type UserDynamicType = WhereUserParams;

export type UserAssociationsArrayType = {
  blocked?: boolean;
  _count?: boolean;
  blockers?: boolean;
  feedbacksVendor?: boolean;
  feedbackTrader?: boolean;
  offers?: boolean;
  systemMessages?: boolean;
  tradeTrader?: boolean;
  tradeVendor?: boolean;
  trusted?: boolean;
  trusters?: boolean;
  userLanguage?: boolean;
};

export type GetUserReturnType = {
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

export type UserIncludes = Prisma.UserInclude;
export type UserLanguageIncludes = Prisma.UserLanguageInclude;
