import { Decimal, prisma } from '@/services/db';
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
  cancelTrade as cancelTradeERC20,
  executeTrade as executeTradeERC20,
  getTrade as getTradeERC20,
  raiseDispute as raiseDisputeERC20,
} from '@/services/blockchains/escrow/erc20';
import {
  cancelTrade as cancelTradeNative,
  executeTrade as executeTradeNative,
  getTradeBalance as getTradeBalanceNative,
  getTrade as getTradeNative,
  raiseDispute as raiseDisputeNative,
} from '@/services/blockchains/escrow/native';
import { sendEmailsTrade, updateAddXPTier } from './utils';

import ChatMessage from '@/models/ChatMessage';
import { EMAIL_FROM } from '@/services/email';
import SystemMessage from '@/services/systemMessage';
import buildTradeConfirmationEmail from '@/services/email/templates/trade-confirmation';
import { create } from 'node:domain';
import { getRandomAdmin } from '@/services/admin';
import { isERC20Trade } from '@/services/blockchains';
import { parseEther } from 'ethers';
import { publishToQueue } from '@/services/rabbitmq';

export default class Trade {
  private socket: Socket;
  private io: IO;

  constructor(socket: Socket, io: IO) {
    this.socket = socket;
    this.io = io;
  }

  sellerFundedTrade() {
    try {
      this.socket.on(
        'blockchain_seller_funded_trade',
        async ({ chatId, senderId }) => {
          try {
            const result = await prisma.$transaction(async (tx) => {
              // 1. Fetch trade and related offer
              const trade = await tx.trade.findFirst({
                where: {
                  chat: { id: chatId },
                },
                select: {
                  id: true,
                  vendorId: true,
                  traderId: true,
                  buyerFundedAt: true,
                  offer: {
                    select: { offerType: true },
                  },
                },
              });

              if (!trade) return { error: 'Trade not found' };

              // 2. Determine seller based on offer type
              const sellerId =
                trade.offer.offerType === 'buy'
                  ? trade.vendorId
                  : trade.traderId;

              const isSeller = senderId === sellerId;

              if (!isSeller) {
                return { error: 'Only the seller can fund the trade' };
              }

              const fundedAt = new Date();

              // 3. Set rejection reset flags based on offer type
              const updateData: any = {
                status: 'IN_PROGRESS',
                sellerFundedAt: fundedAt,
                fundedAt: trade.buyerFundedAt ? fundedAt : null,
              };

              if (trade.offer.offerType === 'buy') {
                updateData.vendorRejectedFunding = false;
              } else {
                updateData.traderRejectedFunding = false;
              }

              // 4. Update trade
              const updatedTrade = await tx.trade.update({
                where: { id: trade.id },
                data: updateData,
              });

              return { updatedTrade, fundedAt };
            });

            // 5. Emit error or success
            if ('error' in result) {
              this.io.to(chatId).emit('blockchain_seller_funded_trade_error', {
                error: true,
                message: result.error,
              });
              return;
            }

            this.io.to(chatId).emit('blockchain_seller_funded_trade_success', {
              fundedAt: result.fundedAt,
            });
          } catch (err) {
            console.error('Transaction failed:', err);
            this.io.to(chatId).emit('blockchain_seller_funded_trade_error', {
              error: true,
              message: 'Server error occurred.',
            });
          }
        },
      );
    } catch (error) {
      console.log({ error });
    }
  }

  buyerFundedTrade() {
    try {
      this.socket.on(
        'blockchain_buyer_funded_trade',
        async ({ chatId, senderId }) => {
          try {
            const result = await prisma.$transaction(async (tx) => {
              // 1. Fetch trade and related offer
              const trade = await tx.trade.findFirst({
                where: {
                  chat: { id: chatId },
                },
                select: {
                  id: true,
                  vendorId: true,
                  traderId: true,
                  sellerFundedAt: true,
                  offer: {
                    select: { offerType: true },
                  },
                },
              });

              if (!trade) return { error: 'Trade not found' };

              // 2. Determine buyer based on offer type
              const buyerId =
                trade.offer.offerType === 'sell'
                  ? trade.vendorId
                  : trade.traderId;

              const isBuyer = senderId === buyerId;

              if (!isBuyer) {
                return { error: 'Only the buyer can fund the trade' };
              }

              const fundedAt = new Date();

              // 3. Set rejection reset flags based on offer type
              const updateData: any = {
                status: 'IN_PROGRESS',
                buyerFundedAt: fundedAt,
                fundedAt: trade.sellerFundedAt ? fundedAt : null,
              };

              if (trade.offer.offerType === 'sell') {
                updateData.vendorRejectedFunding = false;
              } else {
                updateData.traderRejectedFunding = false;
              }

              // 4. Update trade
              const updatedTrade = await tx.trade.update({
                where: { id: trade.id },
                data: updateData,
              });

              return { updatedTrade, fundedAt };
            });

            // 5. Emit error or success
            if ('error' in result) {
              this.io.to(chatId).emit('blockchain_buyer_funded_trade_error', {
                error: true,
                message: result.error,
              });
              return;
            }

            this.io.to(chatId).emit('blockchain_buyer_funded_trade_success', {
              fundedAt: result.fundedAt,
            });
          } catch (err) {
            console.error('Transaction failed:', err);
            this.io.to(chatId).emit('blockchain_buyer_funded_trade_error', {
              error: true,
              message: 'Server error occurred.',
            });
          }
        },
      );
    } catch (error) {
      console.log({ error });
    }
  }

  fundTradeSuccess() {
    try {
      this.socket.on('blockchain_trade_fund_tx_success', async ({ chatId }) => {
        const trade = await prisma.trade.findFirst({
          where: {
            chat: {
              id: chatId,
            },
          },
          select: {
            id: true,
          },
        });

        if (!trade?.id) {
          this.io
            .to(chatId)
            .emit('blockchain_trade_fund_tx_error', { error: true });
          return;
        }

        const fundedAt = new Date();

        await prisma.trade.update({
          where: {
            id: trade?.id,
          },
          data: {
            status: 'IN_PROGRESS',
            fundedAt,
          },
        });

        this.io.to(chatId).emit('trade_funded_success', {
          fundedAt: new Date(),
        });
      });
    } catch (error) {
      console.log({ error });
    }
  }

  buyerFundTradeRejected() {
    try {
      this.socket.on(
        'blockchaion_buyer_fund_trade_rejected',
        async ({ chatId, senderId }) => {
          try {
            const result = await prisma.$transaction(async (tx) => {
              // 1. Get the trade with chat and offer info
              const trade = await tx.trade.findFirst({
                where: {
                  chat: {
                    id: chatId,
                  },
                },
                select: {
                  id: true,
                  vendorId: true,
                  traderId: true,
                  offer: {
                    select: {
                      offerType: true,
                    },
                  },
                },
              });

              if (!trade) return { error: 'Trade not found' };

              // 2. Determine buyer based on offerType
              const buyerId =
                trade.offer.offerType === 'sell'
                  ? trade.traderId
                  : trade.vendorId;

              // 3. Ensure sender is the buyer
              // if (senderId !== buyerId) {
              //   return { error: 'Only the buyer can reject funding' };
              // }

              // 4. Update trade
              const updatedTrade = await tx.trade.update({
                where: { id: trade.id },
                data: {
                  status: 'IN_PROGRESS',
                  traderRejectedFunding: true,
                },
              });

              return { updatedTrade };
            });

            // 5. Emit error if any
            if ('error' in result) {
              this.io
                .to(chatId)
                .emit('blockchaion_buyer_fund_trade_rejected_error', {
                  error: true,
                  message: result.error,
                });
              return;
            }

            // 6. Emit success
            this.io
              .to(chatId)
              .emit('blockchaion_buyer_fund_trade_rejected_success', {
                traderRejectedFunding: true,
              });
          } catch (err) {
            console.error('Transaction failed:', err);
            this.io
              .to(chatId)
              .emit('blockchaion_buyer_fund_trade_rejected_error', {
                error: true,
                message: 'Server error occurred.',
              });
          }
        },
      );
    } catch (error) {
      console.log({ error });
    }
  }

  sellerFundTradeRejected() {
    try {
      this.socket.on(
        'blockchaion_seller_fund_trade_rejected',
        async ({ chatId, senderId }) => {
          try {
            const result = await prisma.$transaction(async (tx) => {
              // 1. Find trade with offer and chat by chatId
              const trade = await tx.trade.findFirst({
                where: {
                  chat: {
                    id: chatId,
                  },
                },
                select: {
                  id: true,
                  vendorId: true,
                  traderId: true,
                  offer: {
                    select: {
                      offerType: true,
                    },
                  },
                },
              });

              if (!trade) return { error: 'Trade not found' };

              // 2. Determine seller based on offerType
              const sellerId =
                trade.offer.offerType === 'buy'
                  ? trade.vendorId
                  : trade.traderId;

              // 3. Check if the sender is the actual seller
              if (senderId !== sellerId) {
                return { error: 'Only the seller can reject funding' };
              }

              // 4. Update trade
              const updatedTrade = await tx.trade.update({
                where: { id: trade.id },
                data: {
                  status: 'IN_PROGRESS',
                  vendorRejectedFunding: true,
                },
              });

              return { updatedTrade };
            });

            // 5. Handle error cases
            if ('error' in result) {
              this.io
                .to(chatId)
                .emit('blockchaion_seller_fund_trade_rejected_error', {
                  error: true,
                  message: result.error,
                });
              return;
            }

            // 6. Emit success
            this.io
              .to(chatId)
              .emit('blockchaion_seller_fund_trade_rejected_success', {
                vendorRejectedFunding: true,
              });
          } catch (err) {
            console.error('Transaction failed:', err);
            this.io
              .to(chatId)
              .emit('blockchaion_seller_fund_trade_rejected_error', {
                error: true,
                message: 'Server error occurred.',
              });
          }
        },
      );
    } catch (error) {
      console.log({ error });
    }
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
            vendorWallet: {
              select: {
                wallet: {
                  select: {
                    address: true,
                  },
                },
              },
            },
            traderWallet: {
              select: {
                wallet: {
                  select: {
                    address: true,
                  },
                },
              },
            },
            cryptocurrency: {
              select: {
                chains: true,
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

        if (trade?.blockchainTradeId?.toString()) {
          const isERC20TokenTrade = await isERC20Trade(trade.id);

          let executedTrade;

          if (isERC20TokenTrade) {
            executedTrade = await executeTradeERC20(trade?.blockchainTradeId);
          } else {
            const details = await getTradeNative(trade?.blockchainTradeId);
            const tradeBalance = await getTradeBalanceNative(
              trade?.blockchainTradeId,
            );
            executedTrade = await executeTradeNative(trade?.blockchainTradeId);
          }

          if (executedTrade.error) {
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
          select: {
            id: true,
            fiatAmount: true,
            vendor: {
              select: {
                id: true,
                tradeVolume: true,
              },
            },
            trader: {
              select: {
                id: true,
                tradeVolume: true,
              },
            },
          },
        });

        if (!updatedTrade) {
          this.io.to(chatId).emit('trade_set_payment_confirmed_error', {
            error: 'Unable to update trade data',
          });
          return;
        }

        await prisma.user.update({
          where: {
            id: updatedTrade.vendor.id,
          },
          data: {
            tradeVolume: updatedTrade.vendor.tradeVolume?.add(
              updatedTrade.fiatAmount,
            ),
          },
        });
        await prisma.user.update({
          where: {
            id: updatedTrade.trader.id,
          },
          data: {
            tradeVolume: updatedTrade.vendor.tradeVolume?.add(
              updatedTrade.fiatAmount,
            ),
          },
        });

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

        const chatObject = await prisma.chat.findUnique({
          where: {
            id: chatId,
          },
          select: {
            trade: {
              select: {
                id: true,
                cryptocurrency: { select: { chains: true } },
                blockchainTradeId: true,
              },
            },
          },
        });

        if (!chatObject?.trade?.blockchainTradeId || !chatObject.trade.id) {
          this.io.to(chatId).emit('trade_set_canceled_error', {
            error: true,
          });
          return;
        }

        const isERC20TokenTrade = await isERC20Trade(chatObject.trade.id);

        let canceledTrade;

        if (isERC20TokenTrade) {
          canceledTrade = await cancelTradeERC20(
            chatObject?.trade.blockchainTradeId,
            true,
          );
        } else {
          canceledTrade = await cancelTradeNative(
            chatObject?.trade.blockchainTradeId,
            true,
          );
        }

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
            fiatAmount: new Decimal(chat.trade.fiatAmount),
            paymentMethod: chat.trade.paymentMethod,
            type,
            isRepeatedOffender: loserDisputesCount > 0,
          });
          const slaDueAt = calculateSlaDueDate({
            fiatAmount: new Decimal(chat.trade.fiatAmount),
            paymentMethod: chat.trade.paymentMethod,
            vendorTrustScore: chat.trade.vendor.trustScore,
          });
          const priorityScore = determinePriority(
            severity,
            chat.trade.vendor.trustScore,
          );
          const priority = mapPriorityScoreToLevel(priorityScore);
          const disputedAtEndedAt = new Date();
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
              createdAt: disputedAtEndedAt,
            },
          });

          for (const evidence of evidences) {
            await prisma.$transaction(async (tx) => {
              const uploadedFile = await tx.uploadedFile.create({
                data: {
                  mimeType: evidence.mimeType,
                  key: evidence.key,
                  size: evidence.size,
                },
              });

              const disputeEvidence = await tx.disputeEvidence.create({
                data: {
                  type: 'BANK_STATEMENT',
                  disputeId: dispute.id,
                  submittedById: disputeRaiser.id,
                  fileId: uploadedFile.id,
                },
              });

              return { uploadedFile, disputeEvidence };
            });
          }

          await prisma.trade.update({
            where: {
              id: chat.trade.id,
            },
            data: {
              status: 'DISPUTED',
              disputedAt: disputedAtEndedAt,
              endedAt: disputedAtEndedAt,
            },
          });

          this.io.to(chatId).emit('trade_set_disputed_success', {
            status: 'DISPUTED',
            disputedAt: disputedAtEndedAt,
          });
        } catch (error) {
          console.error('Error setting trade as disputed:', error);
          this.io.to(chatId).emit('trade_set_disputed_error', {
            error,
          });
          return;
        }
      },
    );
  }
}
