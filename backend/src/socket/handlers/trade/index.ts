import { IO, Socket } from '../types';
import {
  SetTradeAsCanceledParams,
  SetTradeAsPaidParams,
  SetTradeAsPaymentConfirmed,
} from './types';
import { cancelTrade, confirmTrade } from '@/services/blockchains/ethereum';
import { prisma, redisClient } from '@/services/db';
import { sendEmailsTrade, updateAddXPTier } from './utils';

import ChatMessage from '@/models/ChatMessage';
import { EMAIL_FROM } from '@/services/email';
import buildTradeConfirmationEmail from '@/services/email/templates/trade-confirmation';
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
        const senderSocketId = await redisClient.hGet(
          'onlineTradingUsers',
          from,
        );
        const recipientSocketId = await redisClient.hGet(
          'onlineTradingUsers',
          to,
        );

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
        }

        const accountCreatedEmailBody = await buildTradeConfirmationEmail(
          emailTrade?.trader,
          emailTrade!,
        );

        const publishedAccountCreated = await publishToQueue('emails', {
          from: EMAIL_FROM.TRADE,
          to: [
            {
              email: emailTrade?.trader.email!,
              name: `${emailTrade?.trader.firstName} ${emailTrade?.trader.lastName}`,
            },
          ],
          subject: 'Trade Confirmation - Cryptic Activist',
          html: accountCreatedEmailBody,
          text: 'Trade Confirmation',
        });

        console.log('Email id:', publishedAccountCreated);
      },
    );
  }

  setAsCanceled() {
    this.socket.on(
      'trade_set_canceled',
      async ({ chatId, from, to }: SetTradeAsCanceledParams) => {
        const senderSocketId = await redisClient.hGet(
          'onlineTradingUsers',
          from,
        );
        const recipientSocketId = await redisClient.hGet(
          'onlineTradingUsers',
          to,
        );

        const canceledTrade = await cancelTrade();

        if (canceledTrade.message !== 'Trade cancelled') {
          this.io.to(senderSocketId!).emit('trade_set_canceled_error', {
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

        if (!updatedTrade) {
          this.io.to(chatId).emit('trade_set_canceled_error', {
            error: true,
          });
          return;
        }

        this.io.to(chatId).emit('trade_set_canceled_success', {
          canceled: true,
        });
      },
    );
  }
}
