import { EMAIL_FROM, buildTradeStartedEmail } from '../email';
import { Trade, User } from '@prisma/client';
import { prisma, redisClient } from '../db';

import { FRONTEND_PUBLIC } from '@/constants/env';
import { getIO } from '../socket';
import { publishToQueue } from '../rabbitmq';

export default class SystemMessage {
  async tradeStarted(tradeId: string) {
    const trade = await prisma.trade.findUnique({
      where: { id: tradeId },
      select: {
        id: true,
        vendor: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        trader: {
          select: {
            firstName: true,
            lastName: true,
            username: true,
          },
        },
      },
    });

    if (trade) {
      const tradeUrl = FRONTEND_PUBLIC + '/trade/' + trade.id + '/vendor';
      const notificationMessage = `Your trade with user ${trade.trader.firstName} ${trade.trader.lastName} (${trade.trader.username}) has begun. Please wait for payment confirmation before releasing crypto.`;
      const newSystemMessage = await prisma.systemMessage.create({
        data: {
          type: 'TRADE_STARTED',
          userId: trade.vendor.id,
          url: tradeUrl,
          message: notificationMessage,
        },
      });

      // // Check if recipient is online via Redis
      const recipientSocketId = await redisClient.hGet(
        'onlineUsers',
        trade.vendor.id,
      );

      if (recipientSocketId) {
        const io = getIO();

        // Deliver message in real time
        io.to(recipientSocketId).emit('notification_system', {
          message: newSystemMessage.message,
        });
      } else {
        const tradeHasStratedEmailBody = buildTradeStartedEmail(trade);
        await publishToQueue('emails', {
          from: EMAIL_FROM.ACCOUNT,
          to: [
            {
              email: trade.vendor.email,
              name: `${trade.vendor.firstName} ${trade.vendor.lastName}`,
            },
          ],
          subject: 'Trade has started - Cryptic Activist',
          html: tradeHasStratedEmailBody,
          text: 'Trade has started',
        });
      }

      return true;
    } else {
      return false;
    }
  }
}
