import SystemMessage from '@/services/systemMessage';
import { autoLiftExpiredSuspensions } from '@/services/moderation';
import cron from 'node-cron';
import { getIO } from '@/services/socket';
import { prisma } from '@/services/db';

export const expireTimer = async () => {
  cron.schedule('*/1 * * * *', async () => {
    const now = new Date();
    const systemMessage = new SystemMessage();
    const tradesToExpire = await prisma.trade.findMany({
      where: {
        expiredAt: {
          not: null,
        },
        startedAt: {
          lte: new Date(now.getTime() - 1000 * 60), // 1 min ago or more
        },
        status: {
          in: ['PENDING', 'IN_PROGRESS'],
        },
      },
      select: {
        id: true,
        startedAt: true,
        chat: {
          select: {
            id: true,
          },
        },
        offer: {
          select: {
            timeLimit: true,
          },
        },
      },
    });

    for (const trade of tradesToExpire) {
      const expiryTime = new Date(
        trade.startedAt.getTime() + trade.offer.timeLimit * 1000,
      );
      const expiredAt = new Date();
      if (now >= expiryTime) {
        await prisma.trade.update({
          where: { id: trade.id },
          data: { expiredAt, status: 'EXPIRED' },
        });
        await systemMessage.tradeStarted(trade.id);

        if (trade.chat?.id) {
          const io = getIO();
          io.to(trade.chat.id).emit('timer:expired', {
            chatId: trade.chat.id,
            expiredAt,
          });
        }
      }
    }
  });
};

export const handleAutoLiftSuspension = async () => {
  cron.schedule('*/15 * * * *', async () => {
    try {
      await autoLiftExpiredSuspensions();
    } catch (error) {
      console.error('Auto-lift error:', error);
      prisma.$disconnect();
      process.exit(1);
    }
  });
};
