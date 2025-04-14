import { DefaultEventsMap, Server, Socket as SocketIO } from 'socket.io';
import { ETHEREUM_ESCROW_ADDRESS, FRONTEND_PUBLIC } from '@/constants/env';
import {
  NotificationTradeStartSentParams,
  SendMessageParams,
  SetTradeAsCanceledParams,
  SetTradeAsPaidParams,
  User,
  UserInfo,
  WalletAddress,
} from './types';
import {
  cancelTrade,
  confirmFiatReceived,
  confirmFiatSent,
  depositByBuyer,
  depositBySeller,
  initTrade,
  releaseTrade,
} from '@/services/blockchains/ethereum';
import {
  createChatMessage,
  createSystemMessage,
  getChat,
  getChatMessages,
  getTrade,
  getUser,
  redisClient,
  updateManyTrades,
  updateTrade,
  updateUser,
} from 'base-ca';

const socketHandler = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
) => {
  // Store active users and their room information
  const users = new Map<string, UserInfo>();
  const rooms = new Map<string, Set<string>>();

  let timer;

  const startCountdown = (timeLimitMiliseconds: number) => {
    let miliseconds = timeLimitMiliseconds;
    console.log({ miliseconds });
    if (timer) clearInterval(timer); // Clear any existing timer
    timer = setInterval(() => {
      console.log({ miliseconds });

      if (miliseconds > 0) {
        miliseconds + miliseconds - 100;
        io.emit('timer_update', miliseconds);
      } else {
        clearInterval(timer);
        io.emit('timer_end');
      }
    }, 100);
  };

  io.on('connection', (socket: SocketIO) => {
    // Join website
    socket.on('join', async (data: { user: User }) => {
      const { user } = data;
      await redisClient.hSet('onlineUsers', user.id, socket.id);
    });
    // Join trade room
    socket.on(
      'join_room',
      async (data: {
        roomId: string;
        user: User;
        timeLimit: number;
        vendorWalletAddress: string;
        tradeId: string;
      }) => {
        const {
          roomId,
          user,
          timeLimit: _timeLimit,
          vendorWalletAddress,
          tradeId,
        } = data;
        await redisClient.hSet('onlineTradingUsers', user.id, socket.id);

        if (vendorWalletAddress) {
          const trade = await getTrade({ where: { id: tradeId } });

          if (trade?.traderWalletAddress === vendorWalletAddress) {
            socket.emit('trade_error', {
              error: "Vendor's wallet can not be the same as Trader's wallet",
            });
            return;
          }

          const updatedTrade = await updateTrade({
            where: {
              id: tradeId,
            },
            toUpdate: {
              vendorWalletAddress,
            },
          });

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

          console.log({ tradeInitialized });

          if (tradeInitialized.message === 'Trade initialized') {
            const depositedByBuyer = await depositByBuyer(1000000000000000000n);
            const depositedBySeller =
              await depositBySeller(1000000000000000000n);
            console.log({ depositedByBuyer, depositedBySeller });
          }
        }

        // Send existing room messages
        const chatMessages = await getChatMessages({
          where: { chatId: roomId },
          orderBy: 'desc',
        });
        socket.emit('room_messages', chatMessages);

        // Notify room about new user
        io.to(roomId).emit('room_users_update', {});
        io.emit('user_status', { user, status: 'online' });
      },
    );

    // Notify the vendor about new trade
    socket.on(
      'notification_trade_start_sent',
      async (data: NotificationTradeStartSentParams) => {
        const { tradeId } = data;

        const trade = await getTrade({
          where: {
            id: tradeId,
          },
          select: {
            id: true,
            traderId: true,
            vendorId: true,
          },
        });

        if (trade?.id) {
          const trader = await getUser({
            where: {
              id: trade.traderId,
            },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              tradeVendor: true,
            },
          });

          const tradeUrl = FRONTEND_PUBLIC + '/trade/' + trade.id + '/vendor';
          const notificationMessage = `${trader?.firstName} ${trader?.lastName} has started trading with you. Go and trade.`;
          const newSystemMessage = await createSystemMessage({
            create: {
              userId: trade.vendorId,
              url: tradeUrl,
              message: notificationMessage,
            },
            update: {},
            where: { id: '' },
          });
          // // Check if recipient is online via Redis
          const recipientSocketId = await redisClient.hGet(
            'onlineUsers',
            trade.vendorId,
          );
          if (recipientSocketId) {
            // Deliver message in real time
            io.to(recipientSocketId).emit('notification_system', {
              message: newSystemMessage.message,
            });
          }
        }
      },
    );

    // Send message in trade room
    socket.on('send_message', async (data: SendMessageParams) => {
      const { roomId, content } = data;
      const { from, to, message } = content;

      const chat = await getChat({
        where: {
          id: roomId,
        },
      });

      if (chat?.id) {
        const newMessage = await createChatMessage({
          chatId: chat.id,
          from: from,
          message,
          to: to,
        });

        // Check if recipient is online via Redis
        const recipientSocketId = await redisClient.hGet(
          'onlineTradingUsers',
          to,
        );
        if (recipientSocketId) {
          // Deliver message in real time
          io.to(recipientSocketId).emit('receive_message', {
            from,
            to,
            createdAt: newMessage.createdAt,
            message,
          });
        }
      }
    });

    // Set trade as Paid
    socket.on('trade_set_paid', async (data: SetTradeAsPaidParams) => {
      const { from, to, roomId } = data;

      const senderSocketId = await redisClient.hGet('onlineTradingUsers', from);
      const recipientSocketId = await redisClient.hGet(
        'onlineTradingUsers',
        to,
      );

      const confirmedFiatSent = await confirmFiatSent();

      console.log({ confirmedFiatSent });

      if (confirmedFiatSent.message !== 'Fiat sent confirmed') {
        io.to(senderSocketId!).emit('trade_set_paid_error', { error: true });
        return;
      }

      const chat = await getChat({
        where: { id: roomId },
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
          io.to(recipientSocketId).emit('trade_set_paid_error', {
            error: true,
          });
        }
        if (senderSocketId) {
          io.to(senderSocketId).emit('trade_set_paid_error', { error: true });
        }
      }

      if (recipientSocketId) {
        io.to(recipientSocketId).emit('trade_set_paid_success', {
          isPaid: true,
        });
        io.to(recipientSocketId).emit('chat_info_message', {
          from,
          to,
          type: 'info',
          message: 'Trader has set trade as Paid',
        });
      }
      if (senderSocketId) {
        io.to(senderSocketId).emit('trade_set_paid_success', { isPaid: true });
        io.to(senderSocketId).emit('chat_info_message', {
          from,
          to,
          type: 'info',
          message: 'Trader has set trade as Paid',
        });
      }
    });

    // Set trade payment as received
    socket.on(
      'trade_set_payment_confirmed',
      async (data: SetTradeAsPaidParams) => {
        const { from, to, roomId } = data;
        const senderSocketId = await redisClient.hGet(
          'onlineTradingUsers',
          from,
        );
        const recipientSocketId = await redisClient.hGet(
          'onlineTradingUsers',
          to,
        );

        const confirmedFiatReceived = await confirmFiatReceived();

        console.log({ confirmedFiatReceived });

        if (confirmedFiatReceived.message !== 'Fiat received confirmed') {
          io.to(senderSocketId!).emit('trade_set_payment_confirmed_error', {
            error: true,
          });
          return;
        }

        const releasedTrade = await releaseTrade();

        console.log({ releasedTrade });

        if (releasedTrade.message !== 'Trade released') {
          io.to(senderSocketId!).emit('trade_release_error', {
            error: true,
          });
          return;
        }

        const chat = await getChat({
          where: { id: roomId },
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
          },
        });

        if (!updatedTrade) {
          if (recipientSocketId) {
            io.to(recipientSocketId).emit('trade_set_payment_confirmed_error', {
              error: true,
            });
          }
          if (senderSocketId) {
            io.to(senderSocketId).emit('trade_set_payment_confirmed_error', {
              error: true,
            });
          }
        }

        if (recipientSocketId) {
          io.to(recipientSocketId).emit('trade_set_payment_confirmed_success', {
            isPaid: true,
          });
          io.to(recipientSocketId).emit('chat_info_message', {
            from,
            to,
            type: 'info',
            message: 'Vendor has set payment as Received',
          });
        }
        if (senderSocketId) {
          io.to(senderSocketId).emit('trade_set_payment_confirmed_success', {
            isPaid: true,
          });
          io.to(senderSocketId).emit('chat_info_message', {
            from,
            to,
            type: 'info',
            message: 'Vendor has set payment as Received',
          });
        }

        if (roomId) {
          const newInfoMesage = await createChatMessage({
            chatId: roomId,
            from: from,
            type: 'info',
            message: 'Vendor has set payment as Received',
            to: to,
          });
        }
      },
    );

    // Set trade as Canceled
    socket.on('trade_set_canceled', async (data: SetTradeAsCanceledParams) => {
      const { from, to, roomId } = data;
      const senderSocketId = await redisClient.hGet('onlineTradingUsers', from);
      const recipientSocketId = await redisClient.hGet(
        'onlineTradingUsers',
        to,
      );

      const canceledTrade = await cancelTrade();

      if (canceledTrade.message !== 'Trade cancelled') {
        io.to(senderSocketId!).emit('trade_set_canceled_error', {
          error: true,
        });
        return;
      }

      const chat = await getChat({
        where: { id: roomId },
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
          io.to(recipientSocketId).emit('trade_set_canceled_error', {
            error: true,
          });
        }
        if (senderSocketId) {
          io.to(senderSocketId).emit('trade_set_canceled_error', {
            error: true,
          });
        }
      }

      if (recipientSocketId) {
        io.to(recipientSocketId).emit('trade_set_canceled_success', {
          canceled: true,
        });
      }
      if (senderSocketId) {
        io.to(senderSocketId).emit('trade_set_canceled_success', {
          canceled: true,
        });
      }
    });

    // Leave trade room
    socket.on('leave_room', (roomId: string) => {
      const roomUsers = rooms.get(roomId);
      if (roomUsers) {
        roomUsers.delete(socket.id);
        socket.leave(roomId);

        // Notify room about user leaving
        io.to(roomId).emit(
          'room_users_update',
          Array.from(roomUsers).map(
            (userId) => users.get(userId)?.user.username,
          ),
        );
      }
      users.delete(socket.id);
    });

    // Disconnection handling
    socket.on('disconnect', async () => {
      const onlineTradingUsers =
        await redisClient.hGetAll('onlineTradingUsers');

      for (const [userId, sockId] of Object.entries(onlineTradingUsers)) {
        if (sockId === socket.id) {
          await redisClient.hDel('onlineTradingUsers', userId);
          await updateUser({
            where: { id: userId },
            toUpdate: {
              lastLoginAt: new Date(),
            },
          });
          io.emit('user_status', { userId, status: 'offline' });
          break;
        }
      }

      const onlineUsers = await redisClient.hGetAll('onlineUsers');
      for (const [userId, sockId] of Object.entries(onlineUsers)) {
        if (sockId === socket.id) {
          await redisClient.hDel('onlineUsers', userId);
          await updateUser({
            where: { id: userId },
            toUpdate: {
              lastLoginAt: new Date(),
            },
          });
          io.emit('user_status', { userId, status: 'offline' });
          break;
        }
      }
    });
  });
};

export default socketHandler;
