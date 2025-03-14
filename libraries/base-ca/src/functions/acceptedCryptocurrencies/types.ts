import { DateType } from '@/functions/types';

export type CreateAcceptedCryptocurrencyParams = {
  coingeckoId: string;
  symbol: string;
  name: string;
};

export type WhereAcceptedCryptocurrencyParams = {
  id?: string;
  coingeckoId?: string;
  symbol?: string;
  name?: string;
};

export type GetAcceptedCryptocurrencyReturnType = {
  id: string;
  coingeckoId: string;
  symbol: string;
  name: string;
};
