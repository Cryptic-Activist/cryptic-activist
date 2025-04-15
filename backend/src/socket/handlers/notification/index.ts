import { IO, Socket } from '../types';
import { createSystemMessage, getTrade, getUser, redisClient } from 'base-ca';

import { FRONTEND_PUBLIC } from '@/constants/env';
import { TradeStartSentParams } from './types';

export default class Notification {
  private socket: Socket;
  private io: IO;

  constructor(socket: Socket, io: IO) {
    this.socket = socket;
    this.io = io;
  }

  tradeStartSent() {
    this.socket.on(
      'notification_trade_start_sent',
      async ({ tradeId }: TradeStartSentParams) => {
        const trade = await getTrade({
          where: {
            id: tradeId,
          },
          select: {
            id: true,
            traderId: true,
            vendorId: true,
          },
        });

        if (trade?.id) {
          const trader = await getUser({
            where: {
              id: trade.traderId,
            },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              tradeVendor: true,
            },
          });

          const tradeUrl = FRONTEND_PUBLIC + '/trade/' + trade.id + '/vendor';
          const notificationMessage = `${trader?.firstName} ${trader?.lastName} has started trading with you. Go and trade.`;
          const newSystemMessage = await createSystemMessage({
            create: {
              userId: trade.vendorId,
              url: tradeUrl,
              message: notificationMessage,
            },
            update: {},
            where: { id: '' },
          });
          // // Check if recipient is online via Redis
          const recipientSocketId = await redisClient.hGet(
            'onlineUsers',
            trade.vendorId,
          );
          if (recipientSocketId) {
            // Deliver message in real time
            this.io.to(recipientSocketId).emit('notification_system', {
              message: newSystemMessage.message,
            });
          }
        }
      },
    );
  }
}
