import { IO, Socket } from '../types';
import {
  SetTradeAsCanceledParams,
  SetTradeAsDisputedParams,
  SetTradeAsPaidParams,
  SetTradeAsPaymentConfirmed,
} from './types';
import {
  calculateSlaDueDate,
  determinePriority,
  determineSeverity,
  mapPriorityScoreToLevel,
} from '@/utils/disputes';
import {
  cancelTrade,
  confirmTrade,
  raiseDispute,
} from '@/services/blockchains/ethereum';
import { prisma, redisClient } from '@/services/db';
import { sendEmailsTrade, updateAddXPTier } from './utils';

import ChatMessage from '@/models/ChatMessage';
import { EMAIL_FROM } from '@/services/email';
import SystemMessage from '@/services/systemMessage';
import buildTradeConfirmationEmail from '@/services/email/templates/trade-confirmation';
import { getRandomAdmin } from '@/services/admin';
import { parseEther } from 'ethers';
import { publishToQueue } from '@/services/rabbitmq';

export default class Trade {
  private socket: Socket;
  private io: IO;

  constructor(socket: Socket, io: IO) {
    this.socket = socket;
    this.io = io;
  }

  setAsPaid() {
    this.socket.on(
      'trade_set_paid',
      async ({ chatId, from, to }: SetTradeAsPaidParams) => {
        const chat = await prisma.chat.findFirst({
          where: { id: chatId },
          select: {
            tradeId: true,
          },
        });

        const paidAt = new Date();
        const updatedTrade = await prisma.trade.update({
          where: {
            id: chat?.tradeId,
          },
          data: {
            paidAt,
          },
        });

        if (!updatedTrade) {
          this.io.to(chatId).emit('trade_set_paid_error', { error: true });
          return;
        }

        this.io.to(chatId).emit('trade_set_paid_success', {
          paidAt,
        });
        this.io.to(chatId).emit('chat_info_message', {
          from,
          to,
          type: 'info',
          message: 'Trader has set trade as Paid',
        });
      },
    );
  }

  setAsPaymentConfirmed() {
    this.socket.on(
      'trade_set_payment_confirmed',
      async ({ chatId, from, to }: SetTradeAsPaymentConfirmed) => {
        const systemMessage = new SystemMessage();
        const chat = await prisma.chat.findFirst({
          where: { id: chatId },
          select: {
            tradeId: true,
          },
        });

        const trade = await prisma.trade.findFirst({
          where: { id: chat?.tradeId },
          select: {
            id: true,
            blockchainTradeId: true,
            cryptocurrencyAmount: true,
            vendorWalletAddress: true,
            traderWalletAddress: true,
            offer: {
              select: {
                timeLimit: true,
                offerType: true,
              },
            },
          },
        });

        if (trade?.blockchainTradeId?.toString()) {
          const confirmedTrade = await confirmTrade(
            trade.blockchainTradeId,
            parseEther(trade?.cryptocurrencyAmount.toString()),
          );

          console.log({ confirmedTrade });

          if (confirmedTrade.error) {
            this.io.to(chatId).emit('trade_set_payment_confirmed_error', {
              error: 'Unable to confirm trade',
            });
            return;
          }
        } else {
          this.io.to(chatId).emit('trade_set_payment_confirmed_error', {
            error: 'Unable to find blockchain trade id',
          });
          return;
        }

        const paymentConfirmedAt = new Date();
        const endedAt = new Date();
        const escrowReleasedAt = new Date();
        const updatedTrade = await prisma.trade.update({
          where: {
            id: chat?.tradeId,
          },
          data: {
            paymentConfirmedAt,
            status: 'COMPLETED',
            endedAt,
            escrowReleasedAt,
          },
        });

        if (!updatedTrade) {
          this.io.to(chatId).emit('trade_set_payment_confirmed_error', {
            error: 'Unable to update trade data',
          });
          return;
        }

        this.io.to(chatId).emit('trade_set_payment_confirmed_success', {
          paymentConfirmedAt,
          status: 'COMPLETED',
          endedAt,
          escrowReleasedAt,
        });
        this.io.to(chatId).emit('chat_info_message', {
          from,
          to,
          type: 'info',
          message: 'Vendor has set payment as Received',
        });

        this.io.to(chatId).emit('chat_info_message', {
          from,
          to,
          type: 'info',
          message: 'Escrow has release the amount to both parties',
        });
        this.io.to(chatId).emit('escrow_released', { ok: true });

        if (chatId) {
          await ChatMessage.create({
            chatId: chatId,
            from: from,
            type: 'info',
            message: 'Vendor has set payment as Received',
            to: to,
          });
          await ChatMessage.create({
            chatId: chatId,
            from: from,
            type: 'info',
            message: 'Escrow has release the amount to both parties',
            to: to,
          });
        }

        const emailTrade = await prisma.trade.findFirst({
          where: { id: updatedTrade.id },
          select: {
            id: true,
            offer: true,
            trader: true,
            vendor: true,
            paymentMethod: true,
            fiatAmount: true,
            cryptocurrencyAmount: true,
            cryptocurrency: true,
            fiat: true,
            startedAt: true,
            endedAt: true,
            status: true,
          },
        });

        if (emailTrade) {
          const emailSents = await sendEmailsTrade(emailTrade);
          await updateAddXPTier(emailTrade, emailSents.firstTradeRewardReferee);
          await systemMessage.tradeSuccessful(emailTrade.id);
        }
      },
    );
  }

  setAsCanceled() {
    this.socket.on(
      'trade_set_canceled',
      async ({ chatId }: SetTradeAsCanceledParams) => {
        const systemMessage = new SystemMessage();
        const canceledTrade = await cancelTrade();

        console.log({ canceledTrade });

        if (canceledTrade.message !== 'Trade cancelled') {
          this.io.to(chatId).emit('trade_set_canceled_error', {
            error: true,
          });
          return;
        }

        const chat = await prisma.chat.findFirst({
          where: { id: chatId },
          select: {
            tradeId: true,
          },
        });
        const endedAt = new Date();
        const updatedTrade = await prisma.trade.update({
          where: {
            id: chat?.tradeId,
          },
          data: {
            status: 'CANCELLED',
            endedAt,
          },
        });

        await systemMessage.tradeCancelled(updatedTrade.id);

        if (!updatedTrade) {
          this.io.to(chatId).emit('trade_set_canceled_error', {
            error: true,
          });
          return;
        }

        this.io.to(chatId).emit('trade_set_canceled_success', {
          status: 'CANCELLED',
          endedAt,
        });
      },
    );
  }

  setAsDisputed() {
    this.socket.on(
      'trade_set_disputed',
      async ({
        chatId,
        type,
        reason,
        from,
        to,
        evidences,
      }: SetTradeAsDisputedParams) => {
        try {
          const systemMessage = new SystemMessage();

          console.log({ chatId, type, reason, from, to });

          const chat = await prisma.chat.findFirst({
            where: { id: chatId },
            select: {
              trade: {
                select: {
                  id: true,
                  cryptocurrencyAmount: true,
                  exchangeRate: true,
                  fiatAmount: true,
                  vendor: {
                    select: {
                      id: true,
                      trustScore: true,
                    },
                  },
                  trader: {
                    select: {
                      id: true,
                    },
                  },
                  paymentMethod: {
                    select: {
                      isRisky: true,
                    },
                  },
                },
              },
            },
          });

          if (!chat) {
            this.io.to(chatId).emit('trade_set_disputed_error', {
              error: 'Unable to find chat',
            });
            return;
          }

          const disputeRaiser = await prisma.user.findFirst({
            where: {
              id: from,
            },
            select: {
              id: true,
            },
          });

          if (!disputeRaiser) {
            this.io.to(chatId).emit('trade_set_disputed_error', {
              error: 'Unable to find disputeRaiser',
            });
            return;
          }

          const admin = await getRandomAdmin(true);

          console.log({ admin });

          if (!admin) {
            this.io.to(chatId).emit('trade_set_disputed_error', {
              error: 'Unable to find admin',
            });
            return;
          }

          const loserDisputesCount = await prisma.tradeDispute.count({
            where: {
              loserId: to,
            },
          });
          const severity = determineSeverity({
            fiatAmount: chat.trade.fiatAmount,
            paymentMethod: chat.trade.paymentMethod,
            type,
            isRepeatedOffender: loserDisputesCount > 0,
          });
          const slaDueAt = calculateSlaDueDate({
            fiatAmount: chat.trade.fiatAmount,
            paymentMethod: chat.trade.paymentMethod,
            vendorTrustScore: chat.trade.vendor.trustScore,
          });
          const priorityScore = determinePriority(
            severity,
            chat.trade.vendor.trustScore,
          );
          const priority = mapPriorityScoreToLevel(priorityScore);
          const disputedAt = new Date();
          const traderStatement =
            disputeRaiser.id === chat.trade.trader.id ? reason : null;
          const vendorStatement =
            disputeRaiser.id === chat.trade.vendor.id ? reason : null;
          const dispute = await prisma.tradeDispute.create({
            data: {
              type,
              traderStatement,
              vendorStatement,
              severity,
              slaDueAt,
              priority,
              status: 'OPEN',
              tradeId: chat.trade.id,
              moderatorId: admin.id,
              raisedById: disputeRaiser.id,
              createdAt: disputedAt,
            },
          });

          console.log({ dispute });

          console.log({ evidences });

          for (const evidence of evidences) {
            const evidenceFile = await prisma.disputeEvidence.create({
              data: {
                type: 'BANK_STATEMENT',
                disputeId: dispute.id,
                submittedById: disputeRaiser.id,
                fileUrl: evidence.url,
              },
            });
            console.log({ evidenceFile });
          }

          await prisma.trade.update({
            where: {
              id: chat.trade.id,
            },
            data: {
              status: 'DISPUTED',
              disputedAt,
            },
          });

          this.io.to(chatId).emit('trade_set_disputed_success', {
            status: 'DISPUTED',
            disputedAt,
          });
        } catch (error) {
          console.log({ error });
          this.io.to(chatId).emit('trade_set_disputed_error', {
            error,
          });
          return;
        }
      },
    );
  }
}
