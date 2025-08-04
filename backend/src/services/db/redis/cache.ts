import { CacheDataParams } from './types';
import { parseDurationToSeconds } from '@/utils/date';
import { redisClient } from '.';

export const cacheData = async ({
  cacheKey,
  data,
  expiry,
}: CacheDataParams) => {
  await redisClient.del(cacheKey);
  const expiryInSeconds = parseDurationToSeconds(expiry);
  await redisClient.setEx(cacheKey, expiryInSeconds, JSON.stringify(data));
};

export const getCachedData = async (cacheKey: string) => {
  const cachedData = await redisClient.get(cacheKey);

  if (!cachedData) {
    return null;
  }
  return JSON.parse(cachedData);
};
