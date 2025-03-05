import { DateType } from '@/functions/types';

export type CreateCryptocurrencyParams = {
  coingeckoId: string;
  symbol: string;
  name: string;
};

export type WhereCryptocurrencyParams = {
  id?: string;
  coingeckoId?: string;
  symbol?: string;
  name?: string;
  isDeleted?: boolean;
  whenDeleted?: DateType;
  createdAt?: DateType;
  updatedAt?: DateType;
};

export type GetCryptocurrencyReturnType = {
  id: string;
  coingeckoId: string;
  symbol: string;
  name: string;
  isDeleted: boolean;
  whenDeleted: DateType;
  createdAt: DateType;
  updatedAt: DateType;
};
