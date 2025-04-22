import type { IO, Socket } from '../types';
import type { JoinParams, JoinRoomParams } from './types';
import {
  createChatMessage,
  getChat,
  getChatMessages,
  getTrade,
  redisClient,
  updateTrade,
  updateUser,
} from 'base-ca';
import {
  createTrade,
  fundTrade,
  getCreateTradeDetails,
} from '@/services/blockchains/ethereum';

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
        await redisClient.hSet('onlineTradingUsers', user.id, this.socket.id);

        this.socket.join(chatId);
        this.socket.to(chatId).emit('room_users_update', {
          user,
          status: 'online',
        });

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
            traderId: true,
            vendorId: true,
            traderWalletAddress: true,
            vendorWalletAddress: true,
            cryptocurrencyAmount: true,
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

        if (trade?.traderWalletAddress === vendorWalletAddress) {
          this.io.to(chatId).emit('trade_error', {
            error: "Vendor's wallet can not be the same as Trader's wallet",
          });
          return;
        }

        if (vendorWalletAddress) {
          if (!trade?.vendorWalletAddress) {
            const updatedTrade = await updateTrade({
              where: {
                id: trade?.id,
              },
              toUpdate: {
                vendorWalletAddress,
              },
            });
            await createChatMessage({
              chatId,
              from: 'none',
              to: 'none',
              type: 'info',
              message: 'Vendor has entered the chat',
            });

            const createTradeDetails =
              await getCreateTradeDetails(updatedTrade);

            if (!createTradeDetails) {
              this.io.to(chatId).emit('trade_error', {
                error: 'Trade details not found',
              });
              return;
            }

            const tradeCreated = await createTrade({
              arbitrator: createTradeDetails.arbitrator,
              buyer: createTradeDetails.buyer,
              cryptoAmount: createTradeDetails.cryptoAmountWei,
              feeRate: createTradeDetails.feeRate,
              profitMargin: createTradeDetails.profitMargin,
              seller: createTradeDetails.seller,
              tradeDuration: createTradeDetails.tradeDuration,
              buyerCollateral: createTradeDetails.buyerCollateralWei,
              sellerCollateral: createTradeDetails.sellerCollateralWei,
              sellerTotalDeposit: createTradeDetails.sellerFundAmountWei,
            });

            if (tradeCreated.error) {
              this.io.to(chatId).emit('trade_error', {
                error: tradeCreated.error,
              });
              return;
            }

            await createChatMessage({
              chatId,
              from: 'none',
              to: 'none',
              type: 'info',
              message: tradeCreated.message,
            });

            await updateTrade({
              where: { id: trade.id },
              toUpdate: {
                blockchainTradeId: tradeCreated.data?.tradeId,
                blockchainTransactionHash: tradeCreated.txHash,
              },
            });

            const tradeFunded = await fundTrade(
              tradeCreated.data?.tradeId,
              createTradeDetails.sellerFundAmountWei,
            );

            if (tradeFunded.data) {
              await createChatMessage({
                chatId,
                from: 'none',
                to: 'none',
                type: 'info',
                message: tradeFunded.message,
              });
            }

            console.log('TRADE HAS STARTED');

            await updateTrade({
              where: {
                id: trade?.id,
              },
              toUpdate: {
                startedAt: new Date(),
                status: 'IN_PROGRESS',
              },
            });

            this.io.to(chatId).emit('blockchain_trade_created', {
              blockchainTradeId: tradeCreated.data?.tradeId.toString(),
            });
          }
        }

        // Send existing room messages
        const chatMessages = await getChatMessages({
          where: { chatId },
          orderBy: 'desc',
        });

        this.io.to(chatId).emit('room_messages', chatMessages);
        // Notify room about new user
        this.io.emit('user_status', { user, status: 'online' });
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
