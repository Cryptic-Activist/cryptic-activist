import { Queries } from './types';
import { fetchGet } from '../axios';
import { getQueries } from '@/utils/axios';

export const getCoinPrice = async (ids: string, fiatSymbol: string) => {
  const response = await fetchGet(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${fiatSymbol}`,
  );

  if (response.status !== 200) {
    return null;
  }

  return response.data;
};

export const getCoins = async (queriesParams: Queries) => {
  const queries = getQueries(queriesParams);
  const response = await fetchGet(
    'https://api.coingecko.com/api/v3/coins/markets' + queries,
  );

  if (response.status !== 200) {
    return null;
  }

  return response.data;
};

export const getCoin = async (coingeckoId: string) => {
  const response = await fetchGet(
    `https://api.coingecko.com/api/v3/coins/${coingeckoId}`,
  );

  if (response.status !== 200) {
    return null;
  }

  return response.data;
};
