import SystemMessage from '@/services/systemMessage';
import { cancelTrade as cancelTradeERC20 } from '@/services/blockchains/escrow/erc20';
import { cancelTrade as cancelTradeNative } from '@/services/blockchains/escrow/native';
import { getIO } from '@/services/socket';
import { prisma } from '@/services/db';
import { redisClient } from '@/services/db';

export const subscribeToTradeTimers = () => {
  const subscriber = redisClient.duplicate();

  subscriber.on('error', (err) => {
    console.error('Redis subscriber error:', err);
  });

  subscriber.connect().then(() => {
    console.log('Redis subscriber connected');
    subscriber.subscribe('__keyevent@0__:expired', async (message) => {
      if (message.startsWith('trade-timer:')) {
        const tradeId = message.split(':')[1];
        const systemMessage = new SystemMessage();

        const trade = await prisma.trade.findUnique({
          where: { id: tradeId },
          select: {
            id: true,
            blockchainTradeId: true,
            cryptocurrency: {
              select: {
                chains: {
                  select: {
                    abiUrl: true,
                    contractAddress: true,
                  },
                },
              },
            },
            status: true,
            chat: {
              select: {
                id: true,
              },
            },
          },
        });

        if (
          trade &&
          (trade.status === 'PENDING' || trade.status === 'IN_PROGRESS')
        ) {
          let isERC20TokenTrade = true;

          if (
            trade.cryptocurrency.chains[0]?.abiUrl === null &&
            trade.cryptocurrency.chains[0]?.contractAddress === null
          ) {
            isERC20TokenTrade = false;
          }

          if (trade.blockchainTradeId) {
            if (isERC20TokenTrade) {
              await cancelTradeERC20(trade.blockchainTradeId, true);
            } else {
              await cancelTradeNative(trade.blockchainTradeId, true);
            }
          }
          const expiredAt = new Date();
          await prisma.trade.update({
            where: { id: trade.id },
            data: { expiredAt, status: 'EXPIRED' },
          });
          await systemMessage.tradeExpired(trade.id);

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
  });
};
