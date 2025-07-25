import {
  EMAIL_FROM,
  buildPremiumExpiryWarningEmail,
  buildTradeCancelledEmail,
  buildTradeDisputeMoreEvidencesRequestEmail,
  buildTradeDisputeResolvedEmail,
  buildTradeExpiredEmail,
  buildTradeFailedEmail,
  buildTradeStartedEmail,
  buildTradeSuccessfulEmail,
} from '../email';
import {
  SendRequestMoreEvidencesParams,
  SendWarningToUserParams,
} from './types';
import { Trade, User } from '@prisma/client';
import { prisma, redisClient } from '../db';

import { FRONTEND_PUBLIC } from '@/constants/env';
import buildUserWarningEmail from '../email/templates/user-warning';
import { getIO } from '../socket';
import { publishToQueue } from '../rabbitmq';

export default class SystemMessage {
  async premiumExpiryWarning(user: User) {
    const premiumUrl = FRONTEND_PUBLIC + '/premium';
    const message = `Your premium subscription is expiring soon. Please renew your subscription to continue enjoying premium benefits.`;
    const newSystemMessage = await prisma.systemMessage.create({
      data: {
        type: 'PREMIUM_EXPIRY_WARNING',
        userId: user.id,
        url: premiumUrl,
        message,
      },
    });

    // Check if user is online via Redis
    const userSocketId = await redisClient.hGet('onlineUsers', user.id);

    const io = getIO();
    if (userSocketId) {
      // Deliver message in real time
      io.to(userSocketId).emit('notification_system', {
        message: newSystemMessage.message,
      });
    }

    const premiumExpiryWarningEmailBody = buildPremiumExpiryWarningEmail(user);
    await publishToQueue('emails', {
      from: EMAIL_FROM.ACCOUNT,
      to: [
        {
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        },
      ],
      subject: 'Premium subscription expiring soon - Cryptic Activist',
      html: premiumExpiryWarningEmailBody,
      text: 'Premium subscription expiring soon',
    });

    return true;
  }
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
      const message = `Your trade with user ${trade.trader.firstName} ${trade.trader.lastName} (${trade.trader.username}) has begun. Please wait for payment confirmation before releasing crypto.`;
      const newSystemMessage = await prisma.systemMessage.create({
        data: {
          type: 'TRADE_STARTED',
          userId: trade.vendor.id,
          url: tradeUrl,
          message,
        },
      });

      // Check if vendor is online via Redis
      const vendorSocketId = await redisClient.hGet(
        'onlineUsers',
        trade.vendor.id,
      );

      const io = getIO();
      if (vendorSocketId) {
        // Deliver message in real time
        io.to(vendorSocketId).emit('notification_system', {
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

  async tradeFailed(tradeId: string) {
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
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            email: true,
          },
        },
      },
    });

    if (trade) {
      const failedTradeUrl =
        FRONTEND_PUBLIC + '/trade/' + trade.id + '/details';
      const message = `The trade with ${trade.trader.firstName} ${trade.trader.lastName} (${trade.trader.username}) failed due to an error. No assets were exchanged.`;

      const newSystemMessageVendor = await prisma.systemMessage.create({
        data: {
          type: 'TRADE_FAILED',
          userId: trade.vendor.id,
          url: failedTradeUrl,
          message,
        },
      });

      // // Check if recipient is online via Redis
      const vendorSocketId = await redisClient.hGet(
        'onlineUsers',
        trade.vendor.id,
      );
      if (vendorSocketId) {
        const io = getIO();

        // Deliver message in real time
        io.to(vendorSocketId).emit('notification_system', {
          message: newSystemMessageVendor.message,
        });
      }
      const tradeHasFailedEmailBodyVendor = buildTradeFailedEmail(
        trade,
        trade.vendor,
      );
      await publishToQueue('emails', {
        from: EMAIL_FROM.ACCOUNT,
        to: [
          {
            email: trade.vendor.email,
            name: `${trade.vendor.firstName} ${trade.vendor.lastName}`,
          },
        ],
        subject: 'Trade has failed - Cryptic Activist',
        html: tradeHasFailedEmailBodyVendor,
        text: 'Trade has failed',
      });

      const newSystemMessage = await prisma.systemMessage.create({
        data: {
          type: 'TRADE_FAILED',
          userId: trade.trader.id,
          url: failedTradeUrl,
          message,
        },
      });

      const traderSocketId = await redisClient.hGet(
        'onlineUsers',
        trade.trader.id,
      );
      if (traderSocketId) {
        const io = getIO();

        // Deliver message in real time
        io.to(traderSocketId).emit('notification_system', {
          message: newSystemMessage.message,
        });
      }
      const tradeHasFailedEmailBodyTrader = buildTradeFailedEmail(
        trade,
        trade.trader,
      );
      await publishToQueue('emails', {
        from: EMAIL_FROM.ACCOUNT,
        to: [
          {
            email: trade.trader.email,
            name: `${trade.trader.firstName} ${trade.trader.lastName}`,
          },
        ],
        subject: 'Trade has failed - Cryptic Activist',
        html: tradeHasFailedEmailBodyTrader,
        text: 'Trade has failed',
      });

      return true;
    } else {
      return false;
    }
  }

  async tradeExpired(tradeId: string) {
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
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            email: true,
          },
        },
      },
    });

    if (trade) {
      const expiredTradeUrl =
        FRONTEND_PUBLIC + '/trade/' + trade.id + '/details';
      const message = `The trade with ${trade.trader.firstName} ${trade.trader.lastName} (${trade.trader.username}) expired. No assets were exchanged.`;

      const newSystemMessageVendor = await prisma.systemMessage.create({
        data: {
          type: 'TRADE_EXPIRED',
          userId: trade.vendor.id,
          url: expiredTradeUrl,
          message,
        },
      });

      // // Check if recipient is online via Redis
      const vendorSocketId = await redisClient.hGet(
        'onlineUsers',
        trade.vendor.id,
      );
      if (vendorSocketId) {
        const io = getIO();

        // Deliver message in real time
        io.to(vendorSocketId).emit('notification_system', {
          message: newSystemMessageVendor.message,
        });
      }
      const tradeHasExpiredEmailBodyVendor = buildTradeExpiredEmail(
        trade,
        trade.vendor,
      );
      await publishToQueue('emails', {
        from: EMAIL_FROM.ACCOUNT,
        to: [
          {
            email: trade.vendor.email,
            name: `${trade.vendor.firstName} ${trade.vendor.lastName}`,
          },
        ],
        subject: 'Trade has expired - Cryptic Activist',
        html: tradeHasExpiredEmailBodyVendor,
        text: 'Trade has expired',
      });

      const newSystemMessage = await prisma.systemMessage.create({
        data: {
          type: 'TRADE_EXPIRED',
          userId: trade.trader.id,
          url: expiredTradeUrl,
          message,
        },
      });

      const traderSocketId = await redisClient.hGet(
        'onlineUsers',
        trade.trader.id,
      );
      if (traderSocketId) {
        const io = getIO();

        // Deliver message in real time
        io.to(traderSocketId).emit('notification_system', {
          message: newSystemMessage.message,
        });
      }

      const tradeHasExpiredEmailBodyTrader = buildTradeExpiredEmail(
        trade,
        trade.trader,
      );
      await publishToQueue('emails', {
        from: EMAIL_FROM.ACCOUNT,
        to: [
          {
            email: trade.trader.email,
            name: `${trade.trader.firstName} ${trade.trader.lastName}`,
          },
        ],
        subject: 'Trade has expired - Cryptic Activist',
        html: tradeHasExpiredEmailBodyTrader,
        text: 'Trade has expired',
      });
    }
  }

  async tradeSuccessful(tradeId: string) {
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
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            email: true,
          },
        },
      },
    });

    if (trade) {
      const successfulTradeUrl =
        FRONTEND_PUBLIC + '/trade/' + trade.id + '/details';
      const message = `The trade with ${trade.trader.firstName} ${trade.trader.lastName} (${trade.trader.username}) was successful. Assets has been exchanged.`;

      const newSystemMessageVendor = await prisma.systemMessage.create({
        data: {
          type: 'TRADE_COMPLETED',
          userId: trade.vendor.id,
          url: successfulTradeUrl,
          message,
        },
      });
      // // Check if recipient is online via Redis
      const vendorSocketId = await redisClient.hGet(
        'onlineUsers',
        trade.vendor.id,
      );
      if (vendorSocketId) {
        const io = getIO();

        // Deliver message in real time
        io.to(vendorSocketId).emit('notification_system', {
          message: newSystemMessageVendor.message,
        });
      }

      const tradeSuccessfulEmailBodyVendor = buildTradeSuccessfulEmail(
        trade,
        trade.vendor,
      );
      await publishToQueue('emails', {
        from: EMAIL_FROM.ACCOUNT,
        to: [
          {
            email: trade.vendor.email,
            name: `${trade.vendor.firstName} ${trade.vendor.lastName}`,
          },
        ],
        subject: 'Trade was successful - Cryptic Activist',
        html: tradeSuccessfulEmailBodyVendor,
        text: 'Trade was successful',
      });

      const newSystemMessageTrader = await prisma.systemMessage.create({
        data: {
          type: 'TRADE_COMPLETED',
          userId: trade.trader.id,
          url: successfulTradeUrl,
          message,
        },
      });

      const traderSocketId = await redisClient.hGet(
        'onlineUsers',
        trade.trader.id,
      );
      if (traderSocketId) {
        const io = getIO();

        // Deliver message in real time
        io.to(traderSocketId).emit('notification_system', {
          message: newSystemMessageTrader.message,
        });
      }

      const tradeSuccessfulEmailBodyTrader = buildTradeSuccessfulEmail(
        trade,
        trade.trader,
      );
      await publishToQueue('emails', {
        from: EMAIL_FROM.ACCOUNT,
        to: [
          {
            email: trade.trader.email,
            name: `${trade.trader.firstName} ${trade.trader.lastName}`,
          },
        ],
        subject: 'Trade was successful - Cryptic Activist',
        html: tradeSuccessfulEmailBodyTrader,
        text: 'Trade was successful',
      });
    }
  }

  async tradeCancelled(tradeId: string) {
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
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            email: true,
          },
        },
      },
    });

    if (trade) {
      const cancelledTradeUrl =
        FRONTEND_PUBLIC + '/trade/' + trade.id + '/details';
      const message = `The trade with ${trade.trader.firstName} ${trade.trader.lastName} (${trade.trader.username}) has been cancelled. No assets were exchanged.`;

      const newSystemMessageVendor = await prisma.systemMessage.create({
        data: {
          type: 'TRADE_CANCELLED',
          userId: trade.vendor.id,
          url: cancelledTradeUrl,
          message,
        },
      });

      // // Check if recipient is online via Redis
      const vendorSocketId = await redisClient.hGet(
        'onlineUsers',
        trade.vendor.id,
      );
      if (vendorSocketId) {
        const io = getIO();

        // Deliver message in real time
        io.to(vendorSocketId).emit('notification_system', {
          message: newSystemMessageVendor.message,
        });
      }

      const tradeCancelledEmailBodyVendor = buildTradeCancelledEmail(
        trade,
        trade.vendor,
      );
      await publishToQueue('emails', {
        from: EMAIL_FROM.ACCOUNT,
        to: [
          {
            email: trade.vendor.email,
            name: `${trade.vendor.firstName} ${trade.vendor.lastName}`,
          },
        ],
        subject: 'Trade has been cancelled - Cryptic Activist',
        html: tradeCancelledEmailBodyVendor,
        text: 'Trade has been cancelled',
      });

      const newSystemMessageTrader = await prisma.systemMessage.create({
        data: {
          type: 'TRADE_CANCELLED',
          userId: trade.trader.id,
          url: cancelledTradeUrl,
          message,
        },
      });

      const traderSocketId = await redisClient.hGet(
        'onlineUsers',
        trade.trader.id,
      );
      if (traderSocketId) {
        const io = getIO();

        // Deliver message in real time
        io.to(traderSocketId).emit('notification_system', {
          message: newSystemMessageTrader.message,
        });
      }

      const tradeCancelledEmailBodyTrader = buildTradeCancelledEmail(
        trade,
        trade.trader,
      );
      await publishToQueue('emails', {
        from: EMAIL_FROM.ACCOUNT,
        to: [
          {
            email: trade.trader.email,
            name: `${trade.trader.firstName} ${trade.trader.lastName}`,
          },
        ],
        subject: 'Trade has been cancelled - Cryptic Activist',
        html: tradeCancelledEmailBodyTrader,
        text: 'Trade has been cancelled',
      });
    }
  }

  async tradeDisputeResolution(tradeId: string) {
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
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            email: true,
          },
        },
      },
    });

    if (trade) {
      const TradeDisputeResolvedUrl =
        FRONTEND_PUBLIC + '/trade/' + trade.id + '/details';
      const message = `The trade with ${trade.trader.firstName} ${trade.trader.lastName} (${trade.trader.username}) has its dispute resolved. Check the final decision.`;

      const newSystemMessageVendor = await prisma.systemMessage.create({
        data: {
          type: 'TRADE_DISPUTE_RESOLVED',
          userId: trade.vendor.id,
          url: TradeDisputeResolvedUrl,
          message,
        },
      });

      // // Check if recipient is online via Redis
      const vendorSocketId = await redisClient.hGet(
        'onlineUsers',
        trade.vendor.id,
      );
      if (vendorSocketId) {
        const io = getIO();

        // Deliver message in real time
        io.to(vendorSocketId).emit('notification_system', {
          message: newSystemMessageVendor.message,
        });
      }

      const tradeDisputeResolutionEmailBodyVendor =
        buildTradeDisputeResolvedEmail(trade, trade.vendor);
      await publishToQueue('emails', {
        from: EMAIL_FROM.ACCOUNT,
        to: [
          {
            email: trade.vendor.email,
            name: `${trade.vendor.firstName} ${trade.vendor.lastName}`,
          },
        ],
        subject: 'Trade dispute resolved - Cryptic Activist',
        html: tradeDisputeResolutionEmailBodyVendor,
        text: 'Trade dispute resolved',
      });

      const newSystemMessageTrader = await prisma.systemMessage.create({
        data: {
          type: 'TRADE_DISPUTE_RESOLVED',
          userId: trade.trader.id,
          url: TradeDisputeResolvedUrl,
          message,
        },
      });

      const traderSocketId = await redisClient.hGet(
        'onlineUsers',
        trade.trader.id,
      );
      if (traderSocketId) {
        const io = getIO();

        // Deliver message in real time
        io.to(traderSocketId).emit('notification_system', {
          message: newSystemMessageTrader.message,
        });
      }

      const tradeDisputeResolvedEmailBodyTrader =
        buildTradeDisputeResolvedEmail(trade, trade.trader);
      await publishToQueue('emails', {
        from: EMAIL_FROM.ACCOUNT,
        to: [
          {
            email: trade.trader.email,
            name: `${trade.trader.firstName} ${trade.trader.lastName}`,
          },
        ],
        subject: 'Trade has been cancelled - Cryptic Activist',
        html: tradeDisputeResolvedEmailBodyTrader,
        text: 'Trade has been cancelled',
      });
    }
  }

  async sendWarningToUser(params: SendWarningToUserParams) {
    const newSystemMessageVendor = await prisma.systemMessage.create({
      data: {
        type: 'USER_WARNING',
        userId: params.user.id,
        message: params.message,
      },
    });

    // // Check if recipient is online via Redis
    const userSocketId = await redisClient.hGet('onlineUsers', params.user?.id);
    if (userSocketId) {
      const io = getIO();

      // Deliver message in real time
      io.to(userSocketId).emit('notification_system', {
        message: newSystemMessageVendor.message,
      });
    }

    const userWarningEmailBody = buildUserWarningEmail(
      params.trade,
      params.user,
    );
    await publishToQueue('emails', {
      from: EMAIL_FROM.ACCOUNT,
      to: [
        {
          email: params.user?.email,
          name: `${params.user?.firstName} ${params.user?.lastName}`,
        },
      ],
      subject: 'You have received a warning - Cryptic Activist',
      html: userWarningEmailBody,
      text: 'You have received a warning',
    });
  }
  async sendRequestMoreEvidences(params: SendRequestMoreEvidencesParams) {
    const newSystemMessageVendor = await prisma.systemMessage.create({
      data: {
        type: 'TRADE_DISPUTE_MORE_EVIDENCES',
        userId: params.user.id,
        message: params.message,
      },
    });

    // // Check if recipient is online via Redis
    const userSocketId = await redisClient.hGet('onlineUsers', params.user?.id);
    if (userSocketId) {
      const io = getIO();

      // Deliver message in real time
      io.to(userSocketId).emit('notification_system', {
        message: newSystemMessageVendor.message,
      });
    }

    const userWarningEmailBody = buildTradeDisputeMoreEvidencesRequestEmail(
      params.trade,
      params.user,
    );
    await publishToQueue('emails', {
      from: EMAIL_FROM.ACCOUNT,
      to: [
        {
          email: params.user?.email,
          name: `${params.user?.firstName} ${params.user?.lastName}`,
        },
      ],
      subject: 'You have received a warning - Cryptic Activist',
      html: userWarningEmailBody,
      text: 'You have received a warning',
    });
  }
}
