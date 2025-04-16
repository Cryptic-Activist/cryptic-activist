import {
  ETHEREUM_ESCROW_ADDRESS,
  ETHEREUM_ESCROW_ARBITRATOR_ADDRESS,
} from '@/constants/env';
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
  getProvider,
  getTradeDetails,
  initTrade,
} from '@/services/blockchains/ethereum';

import { parseEther } from 'ethers';

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

            const buyer =
              // @ts-ignore
              chat.trade.offer.offerType === 'buy'
                ? (updatedTrade.traderWalletAddress as WalletAddress)
                : (updatedTrade.vendorWalletAddress as WalletAddress);
            const seller =
              // @ts-ignore
              chat.trade.offer.offerType === 'buy'
                ? (updatedTrade.vendorWalletAddress as WalletAddress)
                : (updatedTrade.traderWalletAddress as WalletAddress);
            const cryptoAmountWei = parseEther(
              // @ts-ignore
              chat.trade.cryptocurrencyAmount.toString(),
            ).toString();
            // @ts-ignore
            const depositDuration = (chat.trade.offer.timeLimit * 60) / 4;
            // @ts-ignore
            const confirmationDuration = (chat.trade.offer.timeLimit * 60) / 2;
            // @ts-ignore
            const disputeTimeout = chat.trade.offer.timeLimit * 60 * 2;
            const buyerCollateral = parseEther(
              // @ts-ignore
              (chat.trade.cryptocurrencyAmount * 0.25).toString(),
            ).toString();
            const sellerCollateral = parseEther(
              // @ts-ignore
              (chat.trade.cryptocurrencyAmount * 0.25).toString(),
            ).toString();
            const feeRate =
              // @ts-ignore
              (chat.trade.trader.tier.tradingFee -
                // @ts-ignore
                chat.trade.trader.tier.discount) *
              1000;

            const tradeInitialized = await initTrade({
              buyer: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', // _buyer: the buyer's wallet address
              seller: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8', // _seller: the seller's wallet address
              arbitrator: '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65', // _arbitrator: the designated arbitrator's address
              cryptoAmount: '1000000000000000000',
              buyerCollateral: '1000000000000000000',
              sellerCollateral: '1000000000000000000',
              depositDuration: 3600, // depositDuration: 1 hour
              confirmationDuration: 7200, // _confirmationDuration: 2 hours
              disputeTimeout: 14400, // _disputeTimeout: 4 hours
              feeRate: 50, // _feeRate: 0.5% fee in basis points
              platformWallet: '0x90F79bf6EB2c4f870365E785982E1f101E93b906', // _platformWallet: platform's wallet address
              profitMargin: 50000000000000000n, // _profitMargin: 0.05 ETH in wei
            });

            console.log({ tradeInitialized });

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
              console.log({ depositedByBuyer });
              const depositedBySeller =
                await depositBySeller(1000000000000000000n);
              console.log({ depositedBySeller });

              console.log({ Just: 'Before trade details' });

              const tradeDetails = await getTradeDetails();

              console.log({ tradeDetails });

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
