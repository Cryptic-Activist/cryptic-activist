import { DateType } from '@/functions/types';

export type CreateFiatParams = {
  name: string;
  symbol: string;
};

export type WhereFiatParams = {
  id?: string;
  name?: string;
  symbol?: string;
  isDeleted?: boolean;
  whenDeleted?: DateType;
  createdAt?: DateType;
  updatedAt?: DateType;
};

export type GetFiatReturnType = {
  id: string;
  name?: string;
  symbol?: string;
  isDeleted: boolean;
  whenDeleted: DateType;
  createdAt: DateType;
  updatedAt: DateType;
};
