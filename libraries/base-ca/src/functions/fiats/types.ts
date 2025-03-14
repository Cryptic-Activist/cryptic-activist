import { DateType } from '@/functions/types';

type OrderBy = 'asc' | 'desc';

export type CreateFiatParams = {
  name: string;
  symbol: string;
  country: string;
};

export type WhereFiatParams = {
  id?: string;
  name?: string;
  symbol?: string;
  country?: string;
  isDeleted?: boolean;
  whenDeleted?: DateType;
  createdAt?: DateType;
  updatedAt?: DateType;
};

export type GetFiatReturnType = {
  id: string;
  name?: string;
  symbol?: string;
  country?: string;
  isDeleted: boolean;
  whenDeleted: DateType;
  createdAt: DateType;
  updatedAt: DateType;
};

export type OrderByFiatParams = {
  id?: OrderBy;
  name?: OrderBy;
  symbol?: OrderBy;
  country?: OrderBy;
  isDeleted?: OrderBy;
  whenDeleted?: OrderBy;
  createdAt?: OrderBy;
  updatedAt?: OrderBy;
};

export type GetFiatsParams = {
  where?: WhereFiatParams;
  limit?: number;
  orderBy?: OrderByFiatParams;
};
