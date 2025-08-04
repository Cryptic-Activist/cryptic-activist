import { redisClient } from '@/services/db';

export const getRemainingTime = async (tradeId: string) => {
  const remaining = await redisClient.ttl(`trade-timer:${tradeId}`);
  return remaining > 0 ? remaining : null;
};
