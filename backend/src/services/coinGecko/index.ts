import { Queries } from './types';
import { fetchGet } from '../axios';
import { getQueries } from '@/utils/axios';
import { redisClient } from '../db';

export const getCoinPrice = async (id: string, fiatSymbol: string) => {
  const chacheKey = `${id.toLowerCase()}-${fiatSymbol.toLowerCase()}`;
  const cachedCryptoPrice = await redisClient.get(chacheKey);

  if (cachedCryptoPrice) {
    return parseFloat(cachedCryptoPrice);
  }

  const response = await fetchGet(
    `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=${fiatSymbol}`,
  );

  if (response.status !== 200) {
    return null;
  }

  const crypto = Object.values(response.data)[0] as object;
  const price = Object.values(crypto)[0];

  // Cache the crypto price from 60 seconds
  await redisClient.setEx(chacheKey, 60, JSON.stringify(price));

  return price;
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
