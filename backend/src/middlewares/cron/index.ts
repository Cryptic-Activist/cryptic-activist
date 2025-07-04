import SystemMessage from '@/services/systemMessage';
import { autoLiftExpiredSuspensions } from '@/services/moderation';
import { closeAllOverdueDispute } from '@/services/disputes';
import cron from 'node-cron';
import { getIO } from '@/services/socket';
import { getSetting } from '@/utils/settings';
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

export const autoCloseDisputes = async () => {
  cron.schedule('*/1 * * * *', async () => {
    try {
      console.log('Closing past due disputes and trades...');
      await closeAllOverdueDispute();
    } catch (error) {
      console.error('Auto-close error:', error);
      prisma.$disconnect();
      process.exit(1);
    }
  });
};

export const activateScheduledPremiums = async () => {
  cron.schedule('*/1 * * * *', async () => {
    try {
      const now = new Date();

      const scheduled = await prisma.premiumPurchase.findMany({
        where: {
          status: 'SCHEDULED',
          startsAt: {
            lte: now,
          },
        },
      });

      for (const premium of scheduled) {
        await prisma.premiumPurchase.update({
          where: { id: premium.id },
          data: {
            status: 'COMPLETED',
          },
        });

        console.log(`Activated premium for user ${premium.userId}`);
      }
    } catch (error) {
      console.error('Error activating scheduled premiums:', error);
    }
  });
};

export const chargeRecurringPremiums = async () => {
  cron.schedule('0 * * * *', async () => {
    try {
      const now = new Date();

      const expiredPremiums = await prisma.premiumPurchase.findMany({
        where: {
          status: 'COMPLETED',
          expiresAt: {
            lte: now,
          },
        },
        distinct: ['userId', 'period'], // avoid duplicating for same user/period
        orderBy: {
          expiresAt: 'desc',
        },
      });

      for (const premium of expiredPremiums) {
        const alreadyScheduled = await prisma.premiumPurchase.findFirst({
          where: {
            userId: premium.userId,
            status: 'SCHEDULED',
            period: premium.period,
          },
        });

        if (alreadyScheduled) {
          continue; // skip if already scheduled
        }

        const settingKey =
          premium.period === 'MONTHLY'
            ? 'premiumPriceMonthly'
            : 'premiumPriceYearly';

        const expectedAmount = await getSetting(settingKey);
        const startsAt = new Date(premium.expiresAt);
        const expiresAt =
          premium.period === 'MONTHLY'
            ? new Date(startsAt.getTime() + 30 * 24 * 60 * 60 * 1000)
            : new Date(startsAt.getTime() + 365 * 24 * 60 * 60 * 1000);

        await prisma.premiumPurchase.create({
          data: {
            userId: premium.userId,
            payerAddress: premium.payerAddress,
            period: premium.period,
            status: 'SCHEDULED',
            startsAt,
            expiresAt,
            expectedAmount,
            blockchainTransactionHash: '0xRECURRING_PLACEHOLDER', // to be replaced when on-chain
          },
        });

        console.log(
          `Scheduled recurring ${premium.period} premium for user ${premium.userId}`,
        );
      }
    } catch (error) {
      console.error('Error scheduling recurring premium charges:', error);
    }
  });
};

export const runCronJobs = async () => {
  await expireTimer();
  await handleAutoLiftSuspension();
  await activateScheduledPremiums();
  await chargeRecurringPremiums();
};
