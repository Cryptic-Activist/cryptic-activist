import { prisma } from '@/services/db';

export const getRemainingTime = async (tradeId: string) => {
  const trade = await prisma.trade.findUnique({
    where: { id: tradeId },
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
