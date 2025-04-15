import type { IO, Socket, WalletAddress } from '../types';
import type { JoinParams, JoinRoomParams } from './types';
import {
  createChatMessage,
  getChat,
  getChatMessages,
  redisClient,
  updateTrade,
  updateUser,
} from 'base-ca';
import {
  depositByBuyer,
  depositBySeller,
  initTrade,
} from '@/services/blockchains/ethereum';

import { ETHEREUM_ESCROW_ADDRESS } from '@/constants/env';

export default class Chat {
  private socket: Socket;
  private io: IO;

  constructor(socket: Socket, io: IO) {
    this.socket = socket;
    this.io = io;
  }

  async join() {
    this.socket.on('join', async ({ user }: JoinParams) => {
      await redisClient.hSet('onlineUsers', user.id, this.socket.id);
    });
  }

  async joinRoom() {
    this.socket.on(
      'join_room',
      async ({
        chatId,
        timitLimit,
        user,
        tradeType,
        vendorWalletAddress,
      }: JoinRoomParams) => {
        await redisClient.hSet('onlineTradingUsers', user.id, this.socket.id);

        const chat = await getChat({
          where: { id: chatId },
          select: {
            trade: {
              select: {
                id: true,
                traderId: true,
                vendorId: true,
                traderWalletAddress: true,
                vendorWalletAddress: true,
              },
            },
          },
        });

        // @ts-ignore
        if (!chat?.trade?.id) {
          this.socket.emit('trade_error', {
            error: 'Trade not found',
          });
          return;
        }

        // @ts-ignore
        if (chat.trade.traderWalletAddress === vendorWalletAddress) {
          this.socket.emit('trade_error', {
            error: "Vendor's wallet can not be the same as Trader's wallet",
          });
          return;
        }

        // @ts-ignore
        if (vendorWalletAddress) {
          // @ts-ignore
          if (!chat.trade.vendorWalletAddress) {
            const updatedTrade = await updateTrade({
              where: {
                // @ts-ignore
                id: chat.trade?.id,
              },
              toUpdate: {
                vendorWalletAddress,
              },
            });
            // await createChatMessage({
            //   chatId,
            //   from: 'none',
            //   to: 'none',
            //   type: 'info',
            //   message: 'Vendor has entered the chat',
            // });
            const tradeInitialized = await initTrade({
              buyer: updatedTrade.traderWalletAddress as WalletAddress,
              seller: updatedTrade.vendorWalletAddress as WalletAddress,
              arbitrator: ETHEREUM_ESCROW_ADDRESS,
              cryptoAmount: '1000000000000000000',
              buyerCollateral: '1000000000000000000',
              sellerCollateral: '1000000000000000000',
              depositDuration: 30,
              confirmationDuration: 60,
              disputeTimeout: 120,
              feeRate: 50,
              platformWallet: ETHEREUM_ESCROW_ADDRESS,
            });

            if (tradeInitialized.message === 'Trade initialized') {
              await createChatMessage({
                chatId,
                from: 'none',
                to: 'none',
                type: 'info',
                message: tradeInitialized.message,
              });
              const depositedByBuyer =
                await depositByBuyer(1000000000000000000n);
              const depositedBySeller =
                await depositBySeller(1000000000000000000n);

              await createChatMessage({
                chatId,
                from: 'none',
                to: 'none',
                type: 'info',
                message: depositedByBuyer.message,
              });
              await createChatMessage({
                chatId,
                from: 'none',
                to: 'none',
                type: 'info',
                message: depositedBySeller.message,
              });

              await updateTrade({
                where: {
                  // @ts-ignore
                  id: chat?.trade.id,
                },
                toUpdate: {
                  status: 'IN_PROGRESS',
                },
              });
            }
          }
        }

        // Send existing room messages
        const chatMessages = await getChatMessages({
          where: { chatId },
          orderBy: 'desc',
        });

        this.socket.emit('room_messages', chatMessages);

        // const recipientSocketId = await redisClient.hGet(
        //   'onlineTradingUsers',
        //   // @ts-ignore
        //   chat.trade.traderId,
        // );

        // if (recipientSocketId) {
        //   console.log({ chatMessages });
        //   this.io.to(recipientSocketId).emit('receive_message', chatMessages);
        // }

        // Notify room about new user
        this.io.to(chatId).emit('room_users_update', {});
        this.io.emit('user_status', { user, status: 'online' });
      },
    );
  }

  leave() {
    this.socket.on('leave_room', (chatId: string) => {
      this.socket.leave(chatId);

      // Notify room about user leaving
      this.io.to(chatId).emit('room_users_update', {});
    });
  }

  disconnect() {
    this.socket.on('disconnect', async () => {
      const onlineTradingUsers =
        await redisClient.hGetAll('onlineTradingUsers');

      for (const [userId, sockId] of Object.entries(onlineTradingUsers)) {
        if (sockId === this.socket.id) {
          await redisClient.hDel('onlineTradingUsers', userId);
          await updateUser({
            where: { id: userId },
            toUpdate: {
              lastLoginAt: new Date(),
            },
          });
          this.io.emit('user_status', { userId, status: 'offline' });
          break;
        }
      }

      const onlineUsers = await redisClient.hGetAll('onlineUsers');
      for (const [userId, sockId] of Object.entries(onlineUsers)) {
        if (sockId === this.socket.id) {
          await redisClient.hDel('onlineUsers', userId);
          await updateUser({
            where: { id: userId },
            toUpdate: {
              lastLoginAt: new Date(),
            },
          });
          this.io.emit('user_status', { userId, status: 'offline' });
          break;
        }
      }
    });
  }
}
