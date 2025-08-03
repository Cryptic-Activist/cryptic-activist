import { Address, ContractDetails } from '@/services/blockchains/escrow/types';
import { Decimal, prisma, redisClient } from '@/services/db';
import type { IO, Socket } from '../types';
import type { JoinParams, JoinRoomParams } from './types';
import {
  approveToken,
  createTrade as createTradeERC20,
  getCreateTradeDetails,
  getEscrowDetails as getEscrowDetailsERC20,
  getTokenDecimals,
  getTokenDetails,
} from '@/services/blockchains/escrow/erc20';
import {
  createTrade as createTradeNative,
  getEscrowDetails as getEscrowDetailsNative,
} from '@/services/blockchains/escrow/native';

import ChatMessage from '@/models/ChatMessage';
import { MockToken } from '@/contracts';
import SystemMessage from '@/services/systemMessage';
import { findOrCreateUserWallet } from '@/services/wallet';
import { getRemainingTime } from '@/utils/timer';
import { toTokenUnits } from '@/utils/blockchain';

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
              expiredAt: true,
              traderWallet: {
                select: {
                  wallet: {
                    select: {
                      address: true,
                    },
                  },
                },
              },
              vendorWallet: {
                select: {
                  wallet: {
                    select: {
                      address: true,
                    },
                  },
                },
              },
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
                  chain: {
                    select: {
                      id: true,
                      chainId: true,
                    },
                  },
                },
              },
              cryptocurrency: {
                select: {
                  coingeckoId: true,
                  chains: {
                    where: {
                      chain: {
                        offers: {
                          some: {
                            trades: {
                              some: {
                                id: chat?.tradeId,
                              },
                            },
                          },
                        },
                      },
                    },
                    select: {
                      abiUrl: true,
                      contractAddress: true,
                    },
                  },
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

          // If trade is already ended, notify client and stop.
          if (
            ['EXPIRED', 'COMPLETED', 'FAILED', 'DISPUTED'].includes(
              trade.status,
            )
          ) {
            this.io
              .to(chatId)
              .emit('timer:expired', { chatId, expiredAt: trade.expiredAt });
            return;
          }

          console.log('start countdown');

          // Atomically set the timer if it does not exist.
          await redisClient.set(`trade-timer:${trade.id}`, 'active', {
            EX: trade.offer.timeLimit,
            NX: true, // Only set if the key does not already exist
          });

          // Start the countdown interval.
          const interval = setInterval(async () => {
            const remaining = await getRemainingTime(trade.id);
            if (remaining === null || remaining <= 0) {
              this.io
                .to(chatId)
                .emit('timer:expired', { chatId, expiredAt: new Date() });
              clearInterval(interval);
            } else {
              this.io.to(chatId).emit('timer:update', { remaining, chatId });
            }
          }, 1000);

          if (trade?.traderWallet?.wallet?.address === vendorWalletAddress) {
            this.io.to(chatId).emit('trade_error', {
              error: "Vendor's wallet can not be the same as Trader's wallet",
            });
            return;
          }

          // Start trade if vendor wallet address is provided
          if (vendorWalletAddress) {
            if (!trade?.vendorWallet?.wallet?.address) {
              const vendorWallet = await findOrCreateUserWallet(
                vendorWalletAddress,
                trade?.vendorId,
              );

              const updatedTrade = await prisma.trade.update({
                where: {
                  id: trade?.id,
                },
                data: {
                  vendorWalletId: vendorWallet.id,
                },
                select: {
                  offerId: true,
                  cryptocurrencyAmount: true,
                  vendorWallet: {
                    select: {
                      id: true,
                      wallet: {
                        select: {
                          address: true,
                        },
                      },
                    },
                  },
                  traderWallet: {
                    select: {
                      id: true,
                      wallet: {
                        select: {
                          address: true,
                        },
                      },
                    },
                  },
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

              let isERC20TokenTrade = true;

              if (
                trade.cryptocurrency.chains[0]?.abiUrl === null &&
                trade.cryptocurrency.chains[0]?.contractAddress === null
              ) {
                isERC20TokenTrade = false;
              }

              let tokenContractDetails;

              if (isERC20TokenTrade) {
                tokenContractDetails = await getTokenDetails(
                  trade.cryptocurrency.coingeckoId,
                  trade.offer.chain.id,
                );
              }

              const tokenDecimals = isERC20TokenTrade
                ? await getTokenDecimals({
                    tokenContractDetails,
                  })
                : 18;

              if (!tokenDecimals) {
                this.io.to(chatId).emit('trade_error', {
                  error: 'Unable to find token decimals',
                });
                return;
              }

              const createTradeDetails = await getCreateTradeDetails(
                updatedTrade,
                tokenDecimals,
              );

              console.log({
                createTradeDetails,
                createTradeDetailsBuyWallet:
                  createTradeDetails.buyerWallet.wallet,
              });

              // @ts-ignore
              if (createTradeDetails.error) {
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

              const baseUnits = toTokenUnits(
                trade.cryptocurrencyAmount.toString(),
                tokenDecimals,
                1.1,
              );

              let escrowContractDetails: ContractDetails;

              if (isERC20TokenTrade) {
                escrowContractDetails = await getEscrowDetailsERC20();
              } else {
                escrowContractDetails = await getEscrowDetailsNative();
              }

              if (
                isERC20TokenTrade &&
                (!escrowContractDetails.abi ||
                  !escrowContractDetails.address ||
                  !tokenContractDetails.abi ||
                  !tokenContractDetails.address)
              ) {
                this.io.to(chatId).emit('trade_error', {
                  error: 'Failed to get token approval parameters',
                });
                return;
              }

              if (isERC20TokenTrade) {
                const approved = await approveToken({
                  amount: baseUnits,
                  escrowContractDetails: escrowContractDetails,
                  tokenContractDetails: tokenContractDetails,
                });

                if (approved.error) {
                  this.io.to(chatId).emit('trade_error', {
                    error: 'Failed to approve token',
                  });
                  return;
                }
              }

              const createTradeObj = {
                ...(isERC20TokenTrade && {
                  erc20TokenAddress: tokenContractDetails.address,
                }),
                arbitrator: createTradeDetails.arbitratorWallet.wallet.address,
                buyer: createTradeDetails.buyerWallet.wallet.address,
                seller: createTradeDetails.sellerWallet.wallet.address,
                tradeAmount: createTradeDetails.tradeAmountInWei,
                feeRate: createTradeDetails.feeRate,
                profitMargin: createTradeDetails.profitMargin,
                tradeDuration: createTradeDetails.tradeDurationInSeconds,
                buyerCollateral: createTradeDetails.buyerCollateralInWei,
                sellerCollateral: createTradeDetails.sellerCollateralInWei,
                sellerTotalDeposit: createTradeDetails.sellerTotalFundInWei,
              };

              let tradeCreated;

              if (isERC20TokenTrade) {
                // @ts-ignore
                tradeCreated = await createTradeERC20(createTradeObj);
              } else {
                // @ts-ignore
                tradeCreated = await createTradeNative(createTradeObj);
              }

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
                const tradeEscrowDetails =
                  await prisma.tradeEscrowDetails.create({
                    data: {
                      arbitratorWalletId:
                        createTradeDetails.arbitratorWallet?.id,
                      buyerWalletId: createTradeDetails.buyerWallet.id,
                      sellerWalletId: createTradeDetails.sellerWallet.id,
                      buyerCollateral: createTradeDetails.buyerCollateral,
                      tradeAmount: createTradeDetails.tradeAmount,
                      feeRate: new Decimal(createTradeDetails.feeRate).div(
                        10000,
                      ),
                      profitMargin: new Decimal(
                        createTradeDetails.profitMargin,
                      ).div(10000),
                      sellerCollateral: createTradeDetails.sellerCollateral,
                      sellerTotalFund: createTradeDetails.sellerTotalFund,
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
            'createdAt from message type to attachment',
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
