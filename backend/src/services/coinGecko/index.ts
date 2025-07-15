import { ethers, toBigInt } from 'ethers';
import { fetchGet, fetchPost } from '../axios';

import { Queries } from './types';
import { getQueries } from '@/utils/axios';
import { parseDurationToSeconds } from '@/utils/date';
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
  const expiry = parseDurationToSeconds('1m');
  await redisClient.setEx(chacheKey, expiry, JSON.stringify(price));

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

export const getGasPrice = async (rpcUrl: string) => {
  try {
    const response = await fetchPost(rpcUrl, {
      jsonrpc: '2.0',
      method: 'eth_gasPrice',
      params: [],
      id: 1,
    });

    if (response.status !== 200) {
      return null;
    }

    const weiHex = response.data.result;
    const wei = toBigInt(weiHex);
    const gwei = ethers.formatUnits(wei, 'gwei');
    return `${parseFloat(gwei).toFixed(2)} Gwei`;
  } catch (error) {
    return null;
  }
};

export const getBlockHeight = async (rpcUrl: string) => {
  try {
    const response = await fetchPost(rpcUrl, {
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      params: [],
      id: 1,
    });

    if (response.status !== 200) {
      return null;
    }

    const blockNumberHex = response.data.result; // e.g. "0x10d4f" (hex string)
    const blockNumber = parseInt(blockNumberHex, 16); // convert hex to decimal number
    return blockNumber;
  } catch (error) {
    return null;
  }
};
