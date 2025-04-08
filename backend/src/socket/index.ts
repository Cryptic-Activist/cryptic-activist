import { DefaultEventsMap, Server, Socket as SocketIO } from 'socket.io';
import { SendMessageParams, User, UserInfo } from './types';
import {
  createChatMessage,
  getChat,
  getChatMessages,
  redisClient,
  updateUser,
} from 'base-ca';

const socketHandler = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
) => {
  // Store active users and their room information
  const users = new Map<string, UserInfo>();
  const rooms = new Map<string, Set<string>>();

  io.on('connection', (socket: SocketIO) => {
    // Join trade room
    socket.on('join_room', async (data: { roomId: string; user: User }) => {
      const { roomId, user } = data;
      await redisClient.hSet('onlineUsers', user.id, socket.id);

      // Send existing room messages
      const chatMessages = await getChatMessages({
        where: { chatId: roomId },
        orderBy: 'desc',
      });
      socket.emit('room_messages', chatMessages);

      // const recipientSocketId = await redisClient.hGet('onlineUsers', to);

      // io.emit('user_status', { userId, status: 'offline' });

      // Notify room about new user
      io.to(roomId).emit('room_users_update', {});
      io.emit('user_status', { user, status: 'online' });
    });

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
        const recipientSocketId = await redisClient.hGet('onlineUsers', to);
        if (recipientSocketId) {
          // Deliver message in real time
          io.to(recipientSocketId).emit('receive_message', {
            from,
            to,
            createdAt: newMessage.createdAt,
            message,
          });
        } else {
          // If offline, send a push notification if subscription exists
          // const subscriptionString = await redisClient.hGet(
          //   'pushSubscriptions',
          //   to,
          // );
          // if (subscriptionString) {
          //   const subscription = JSON.parse(subscriptionString);
          //   const payload = JSON.stringify({
          //     title: 'New Message',
          //     body: message,
          //   });
          //   // webpush.sendNotification(subscription, payload)
          //   //   .catch(error => console.error('Push notification error:', error));
          // }
        }
      }
    });

    // Leave trade room
    socket.on('leave_room', (roomId: string) => {
      console.log(`room ${roomId} left`);
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
      console.log('disconnected');
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

      const user = users.get(socket.id);
      if (user && user.roomId) {
        const roomUsers = rooms.get(user.roomId);
        if (roomUsers) {
          roomUsers.delete(socket.id);

          // Notify room about user leaving
          io.to(user.roomId).emit(
            'room_users_update',
            Array.from(roomUsers).map(
              (userId) => users.get(userId)?.user.username,
            ),
          );
        }
      }
      users.delete(socket.id);
    });
  });
};

export default socketHandler;
