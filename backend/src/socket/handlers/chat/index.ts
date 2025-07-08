import type { IO, Socket } from '../types';
import type { JoinParams, JoinRoomParams } from './types';
import {
  createTrade,
  fundTrade,
  getCreateTradeDetails,
} from '@/services/blockchains/escrow';
import { prisma, redisClient } from '@/services/db';

import ChatMessage from '@/models/ChatMessage';
import SystemMessage from '@/services/systemMessage';
import { getRemainingTime } from '@/utils/timer';

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
      async ({ chatId, user, vendorWalletAddress }: JoinRoomParams) => {
        try {
          await redisClient.hSet('onlineTradingUsers', user.id, this.socket.id);
          const systemMessage = new SystemMessage();

          this.socket.join(chatId);
          this.socket.to(chatId).emit('room_users_update', {
            user,
            status: 'online',
          });

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
              traderId: true,
              vendorId: true,
              traderWalletAddress: true,
              vendorWalletAddress: true,
              cryptocurrencyAmount: true,
              status: true,
              tradeEscrowDetails: {
                select: {
                  id: true,
                },
              },
              trader: {
                select: {
                  tier: {
                    select: {
                      tradingFee: true,
                      discount: true,
                    },
                  },
                },
              },
              offer: {
                select: {
                  timeLimit: true,
                  offerType: true,
                },
              },
            },
          });

          if (!trade?.id) {
            this.io.to(chatId).emit('trade_error', {
              error: 'Trade not found',
            });
            return;
          }

          const remaining = await getRemainingTime(trade.id);
          if (remaining === null) {
            if (trade.status === 'IN_PROGRESS' || trade.status === 'PENDING') {
              const expiredAt = new Date();
              await prisma.trade.update({
                where: { id: trade.id },
                data: { expiredAt, status: 'EXPIRED' },
              });
              this.io.to(chatId).emit('timer:expired', { chatId, expiredAt });
              return;
            }
          }

          this.io.to(chatId).emit('timer:update', { remaining, chatId });

          const interval = setInterval(async () => {
            const remaining = await getRemainingTime(trade.id);
            if (remaining === null || remaining <= 0) {
              const endedTrade = await prisma.trade.findUnique({
                where: {
                  id: trade.id,
                  status: {
                    in: ['COMPLETED', 'FAILED', 'DISPUTED'],
                  },
                },
                select: {
                  status: true,
                  id: true,
                  endedAt: true,
                  disputedAt: true,
                },
              });
              if (endedTrade?.status === 'COMPLETED') {
                this.io.to(chatId).emit('trade_completed', {
                  chatId,
                  endedAt: endedTrade.endedAt,
                });
              }
              if (endedTrade?.status === 'FAILED') {
                this.io.to(chatId).emit('trade_failed', {
                  chatId,
                  endedAt: endedTrade.endedAt,
                });
              }
              if (endedTrade?.status === 'DISPUTED') {
                this.io.to(chatId).emit('trade_set_disputed_success', {
                  status: 'DISPUTED',
                  disputedAt: endedTrade.disputedAt,
                });
              }
              clearInterval(interval);
            } else {
              this.io.to(chatId).emit('timer:update', { remaining, chatId });
            }
          }, 1000);

          if (trade?.traderWalletAddress === vendorWalletAddress) {
            this.io.to(chatId).emit('trade_error', {
              error: "Vendor's wallet can not be the same as Trader's wallet",
            });
            return;
          }

          // Start trade if vendor wallet address is provided
          if (vendorWalletAddress) {
            if (!trade?.vendorWalletAddress) {
              const updatedTrade = await prisma.trade.update({
                where: {
                  id: trade?.id,
                },
                data: {
                  vendorWalletAddress,
                },
              });
              await ChatMessage.create({
                chatId,
                from: 'none',
                to: 'none',
                type: 'info',
                message: 'Vendor has entered the chat',
              });

              this.io.to(chatId).emit('room_messages', [
                {
                  _id: 'none',
                  from: 'none',
                  to: 'none',
                  type: 'info',
                  message: 'Vendor has entered the chat',
                },
              ]);

              const createTradeDetails =
                await getCreateTradeDetails(updatedTrade);

              if (!createTradeDetails) {
                const endedAt = new Date();
                await prisma.trade.update({
                  where: { id: trade.id },
                  data: {
                    status: 'FAILED',
                    endedAt,
                  },
                });
                this.io.to(chatId).emit('trade_failed', {
                  error: 'Trade details not found',
                  endedAt,
                });
                await systemMessage.tradeFailed(trade.id);
                return;
              }

              this.io.to(chatId).emit('room_messages', [
                {
                  _id: 'none',
                  from: 'none',
                  to: 'none',
                  type: 'info',
                  message: 'Initiating trade...',
                },
              ]);

              const createTradeObj = {
                arbitrator: createTradeDetails.arbitratorWallet,
                buyer: createTradeDetails.buyerWallet,
                seller: createTradeDetails.sellerWallet,
                tradeAmount: createTradeDetails.tradeAmountInWei,
                feeRate: createTradeDetails.feeRate,
                profitMargin: createTradeDetails.profitMargin,
                tradeDuration: createTradeDetails.tradeDurationInSeconds,
                buyerCollateral: createTradeDetails.buyerCollateralInWei,
                sellerCollateral: createTradeDetails.sellerCollateralInWei,
                sellerTotalDeposit: createTradeDetails.sellerTotalFundInWei,
              };

              const tradeCreated = await createTrade(createTradeObj);

              if (tradeCreated.error) {
                await prisma.trade.update({
                  where: { id: trade.id },
                  data: {
                    status: 'FAILED',
                    endedAt: new Date(),
                  },
                });
                this.io.to(chatId).emit('trade_error', {
                  error: 'Trade creation error',
                });
                await systemMessage.tradeFailed(trade.id);
                return;
              }

              const tradeEscrowDetails =
                await prisma.tradeEscrowDetails.findFirst({
                  where: {
                    trade: {
                      some: {
                        id: trade.id,
                      },
                    },
                  },
                });

              if (!tradeEscrowDetails) {
                console.log({ blockchainTradeId: tradeCreated.data });
                const tradeEscrowDetails =
                  await prisma.tradeEscrowDetails.create({
                    data: {
                      arbitratorWallet: createTradeDetails.arbitratorWallet,
                      buyerCollateralInWei:
                        createTradeDetails.buyerCollateralInWei.toString(),
                      buyerWallet: createTradeDetails.buyerWallet,
                      tradeAmountInWei:
                        createTradeDetails.tradeAmountInWei.toString(),
                      feeRate: createTradeDetails.feeRate,
                      profitMargin: createTradeDetails.profitMargin,
                      sellerWallet: createTradeDetails.sellerWallet,
                      sellerCollateralInWei:
                        createTradeDetails.sellerCollateralInWei.toString(),
                      sellerTotalFundInWei:
                        createTradeDetails.sellerTotalFundInWei.toString(),
                      tradeDurationInSeconds:
                        createTradeDetails.tradeDurationInSeconds,
                      blockchainTradeId: tradeCreated.data?.tradeId.toString(),
                    },
                  });

                await prisma.trade.update({
                  where: { id: trade.id },
                  data: {
                    tradeEscrowDetailsId: tradeEscrowDetails.id,
                  },
                });
              }

              await ChatMessage.create({
                chatId,
                from: 'none',
                to: 'none',
                type: 'info',
                message: tradeCreated.message,
              });

              await prisma.trade.update({
                where: { id: trade.id },
                data: {
                  status: 'IN_PROGRESS',
                  blockchainTradeId: tradeCreated.data?.tradeId,
                  blockchainTransactionHash: tradeCreated.txHash,
                },
              });

              const payload = JSON.stringify(
                {
                  blockchainTradeId: tradeCreated.data?.tradeId.toString(),
                  ...createTradeObj,
                },
                (_, value) =>
                  typeof value === 'bigint' ? value.toString() : value,
              );
              this.io.to(chatId).emit('blockchain_trade_created', payload);
            }
          }

          // Send existing room messages
          let query = ChatMessage.find(
            { chatId },
            'createdAt from message type to',
          );
          query = query.sort('desc');
          const chatMessages = await query.exec();

          this.io.to(chatId).emit('room_messages', chatMessages);
          // Notify room about new user
          this.io.emit('user_status', { user, status: 'online' });
        } catch (error) {
          console.log({ error });
          this.io.to(chatId).emit('trade_error', {
            error: 'Trade creation error',
          });
        }
      },
    );
  }

  leave() {
    this.socket.on('leave_room', (chatId: string) => {
      this.socket.leave(chatId);

      // Notify room about user leaving
      this.socket.to(chatId).emit('leave_room', {});
    });
  }

  disconnect() {
    this.socket.on('disconnect', async () => {
      const onlineTradingUsers =
        await redisClient.hGetAll('onlineTradingUsers');

      for (const [userId, sockId] of Object.entries(onlineTradingUsers)) {
        if (sockId === this.socket.id) {
          await redisClient.hDel('onlineTradingUsers', userId);
          await prisma.user.update({
            where: { id: userId },
            data: {
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
          await prisma.user.update({
            where: { id: userId },
            data: {
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
