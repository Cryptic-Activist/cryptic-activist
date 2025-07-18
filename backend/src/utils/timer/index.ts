import { prisma } from '@/services/db';

export const getRemainingTime = async (tradeId: string) => {
  const trade = await prisma.trade.findUnique({
    where: {
      id: tradeId,
      status: {
        in: ['PENDING', 'IN_PROGRESS'],
      },
    },
    select: {
      startedAt: true,
      offer: {
        select: {
          timeLimit: true,
        },
      },
      expiredAt: true,
    },
  });

  if (!trade || trade.expiredAt) return null;

  const now = Date.now();
  const expiry =
    new Date(trade.startedAt).getTime() + trade.offer.timeLimit * 1000;
  const remaining = Math.floor((expiry - now) / 1000);

  return remaining > 0 ? remaining : 0;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const rateLimitedMap = async <T, R>(
  array: T[],
  callback: (item: T) => Promise<R>,
  callsPerSecond: number,
): Promise<R[]> => {
  const msPerCall = 1000 / callsPerSecond; // Time per call in milliseconds
  const results: R[] = [];

  for (const item of array) {
    const result = await callback(item);
    results.push(result);
    await delay(msPerCall); // Wait to respect rate limit
  }

  return results;
};
