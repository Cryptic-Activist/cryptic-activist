import { IO, Socket } from '../types';
import {
  SetTradeAsCanceledParams,
  SetTradeAsPaidParams,
  SetTradeAsPaymentConfirmed,
} from './types';
import {
  cancelTrade,
  confirmFiatReceived,
  confirmFiatSent,
  confirmTrade,
  getProvider,
  releaseTrade,
} from '@/services/blockchains/ethereum';
import {
  createChatMessage,
  getChat,
  getTrade,
  redisClient,
  updateTrade,
} from 'base-ca';

import { ETHEREUM_ESCROW_ADDRESS } from '@/constants/env';
import { parseEther } from 'ethers';

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

        const chat = await getChat({
          where: { id: chatId },
          select: {
            tradeId: true,
          },
        });
        const updatedTrade = await updateTrade({
          where: {
            id: chat?.tradeId,
          },
          toUpdate: {
            paid: true,
          },
        });

        if (!updatedTrade) {
          this.io.to(chatId).emit('trade_set_paid_error', { error: true });
          return;
        }

        this.io.to(chatId).emit('trade_set_paid_success', {
          isPaid: true,
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
        const chat = await getChat({
          where: { id: chatId },
          select: {
            tradeId: true,
          },
        });

        const trade = await getTrade({
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
              error: true,
            });
            return;
          }
        } else {
          console.log({ trade });
          this.io.to(chatId).emit('trade_set_payment_confirmed_error', {
            error: true,
          });
          return;
        }

        const updatedTrade = await updateTrade({
          where: {
            id: chat?.tradeId,
          },
          toUpdate: {
            paymentConfirmed: true,
            status: 'COMPLETED',
            endedAt: new Date(),
            escrowReleaseDate: new Date(),
          },
        });

        if (!updatedTrade) {
          this.io.to(chatId).emit('trade_set_payment_confirmed_error', {
            error: true,
          });
          return;
        }

        this.io.to(chatId).emit('trade_set_payment_confirmed_success', {
          isPaid: true,
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
          await createChatMessage({
            chatId: chatId,
            from: from,
            type: 'info',
            message: 'Vendor has set payment as Received',
            to: to,
          });
          await createChatMessage({
            chatId: chatId,
            from: from,
            type: 'info',
            message: 'Escrow has release the amount to both parties',
            to: to,
          });
        }
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

        const chat = await getChat({
          where: { id: chatId },
          select: {
            tradeId: true,
          },
        });
        const updatedTrade = await updateTrade({
          where: {
            id: chat?.tradeId,
          },
          toUpdate: {
            paid: false,
            status: 'CANCELLED',
          },
        });

        if (!updatedTrade) {
          if (recipientSocketId) {
            this.io.to(recipientSocketId).emit('trade_set_canceled_error', {
              error: true,
            });
          }
          if (senderSocketId) {
            this.io.to(senderSocketId).emit('trade_set_canceled_error', {
              error: true,
            });
          }
        }

        if (recipientSocketId) {
          this.io.to(recipientSocketId).emit('trade_set_canceled_success', {
            canceled: true,
          });
        }
        if (senderSocketId) {
          this.io.to(senderSocketId).emit('trade_set_canceled_success', {
            canceled: true,
          });
        }
      },
    );
  }
}
