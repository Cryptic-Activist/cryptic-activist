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
  releaseTrade,
} from '@/services/blockchains/ethereum';
import { createChatMessage, getChat, redisClient, updateTrade } from 'base-ca';

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

        const confirmedFiatSent = await confirmFiatSent();

        console.log({ confirmedFiatSent });

        if (confirmedFiatSent.message !== 'Fiat sent confirmed') {
          this.io
            .to(senderSocketId!)
            .emit('trade_set_paid_error', { error: true });
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
            paid: true,
          },
        });

        if (!updatedTrade) {
          if (recipientSocketId) {
            this.io.to(recipientSocketId).emit('trade_set_paid_error', {
              error: true,
            });
          }
          if (senderSocketId) {
            this.io
              .to(senderSocketId)
              .emit('trade_set_paid_error', { error: true });
          }
        }

        if (recipientSocketId) {
          this.io.to(recipientSocketId).emit('trade_set_paid_success', {
            isPaid: true,
          });
          this.io.to(recipientSocketId).emit('chat_info_message', {
            from,
            to,
            type: 'info',
            message: 'Trader has set trade as Paid',
          });
        }
        if (senderSocketId) {
          this.io
            .to(senderSocketId)
            .emit('trade_set_paid_success', { isPaid: true });
          this.io.to(senderSocketId).emit('chat_info_message', {
            from,
            to,
            type: 'info',
            message: 'Trader has set trade as Paid',
          });
        }
      },
    );
  }

  setAsPaymentConfirmed() {
    this.socket.on(
      'trade_set_payment_confirmed',
      async ({ chatId, from, to }: SetTradeAsPaymentConfirmed) => {
        const senderSocketId = await redisClient.hGet(
          'onlineTradingUsers',
          from,
        );
        const recipientSocketId = await redisClient.hGet(
          'onlineTradingUsers',
          to,
        );

        const confirmedFiatReceived = await confirmFiatReceived();

        if (confirmedFiatReceived.message !== 'Fiat received confirmed') {
          this.io
            .to(senderSocketId!)
            .emit('trade_set_payment_confirmed_error', {
              error: true,
            });
          return;
        }

        const releasedTrade = await releaseTrade();

        if (releasedTrade.message !== 'Trade released') {
          this.io.to(senderSocketId!).emit('trade_release_error', {
            error: true,
          });
          return;
        }

        const chat = await getChat({
          where: { id: chatId },
          select: {
            tradeId: true,
            id: true,
          },
        });
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
          if (recipientSocketId) {
            this.io
              .to(recipientSocketId)
              .emit('trade_set_payment_confirmed_error', {
                error: true,
              });
          }
          if (senderSocketId) {
            this.io
              .to(senderSocketId)
              .emit('trade_set_payment_confirmed_error', {
                error: true,
              });
          }
        }

        if (recipientSocketId) {
          this.io
            .to(recipientSocketId)
            .emit('trade_set_payment_confirmed_success', {
              isPaid: true,
            });
          this.io.to(recipientSocketId).emit('chat_info_message', {
            from,
            to,
            type: 'info',
            message: 'Vendor has set payment as Received',
          });
          if (releasedTrade.message === 'Trade released') {
            this.io.to(recipientSocketId).emit('chat_info_message', {
              from,
              to,
              type: 'info',
              message: 'Escrow has release the amount to both parties',
            });
            this.io.to(recipientSocketId).emit('escrow_released', { ok: true });
          }
        }
        if (senderSocketId) {
          this.io
            .to(senderSocketId)
            .emit('trade_set_payment_confirmed_success', {
              isPaid: true,
            });
          this.io.to(senderSocketId).emit('chat_info_message', {
            from,
            to,
            type: 'info',
            message: 'Vendor has set payment as Received',
          });
          if (releasedTrade.message === 'Trade released') {
            this.io.to(senderSocketId).emit('chat_info_message', {
              from,
              to,
              type: 'info',
              message: 'Escrow has release the amount to both parties',
            });
            this.io.to(senderSocketId).emit('escrow_released', { ok: true });
          }
        }

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
