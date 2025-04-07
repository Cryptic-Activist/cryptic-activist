import { DefaultEventsMap, Server, Socket as SocketIO } from 'socket.io';
import { SendMessageParams, User, UserInfo } from './types';
import { createChatMessage, getChat, getUser, redisClient } from 'base-ca';

const socketHandler = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
) => {
  // Store active users and their room information
  const users = new Map<string, UserInfo>();
  const rooms = new Map<string, Set<string>>();
  const roomMessages = new Map<string, any[]>();

  io.on('connection', (socket: SocketIO) => {
    // console.log('New client connected:', socket.id);

    // Join trade room
    socket.on('join_room', async (data: { roomId: string; user: User }) => {
      const { roomId, user } = data;
      await redisClient.hSet('onlineUsers', user.id, socket.id);
      // console.log(`User ${user.id} connected with socket id ${socket.id}`);

      // Ensure room doesn't exceed 3 users
      if (!rooms.has(roomId)) {
        rooms.set(roomId, new Set());
      }

      const roomUsers = rooms.get(roomId)!;

      if (roomUsers.size >= 3) {
        socket.emit('room_error', 'Trade room is full');
        return;
      }

      // Add user to room
      roomUsers.add(socket.id);
      socket.join(roomId);

      // Store user information
      users.set(socket.id, {
        id: socket.id,
        user,
        roomId,
      });

      // Initialize room messages if not exists
      if (!roomMessages.has(roomId)) {
        roomMessages.set(roomId, []);
      }

      // Send existing room messages
      const existingMessages = roomMessages.get(roomId) || [];
      socket.emit('room_messages', existingMessages);

      // Notify room about new user
      io.to(roomId).emit(
        'room_users_update',
        Array.from(roomUsers).map((userId) => users.get(userId)?.user.username),
      );
    });

    // Send message in trade room
    socket.on('send_message', async (data: SendMessageParams) => {
      const { roomId, content } = data;
      const { from, to, message } = content;
      // console.log(`Message from ${from} to ${to}: ${message}`);

      const chat = await getChat({
        where: {
          id: roomId,
        },
      });

      if (chat?.id) {
        const newMessage = await createChatMessage({
          chatId: chat.id,
          from: from.id,
          message,
          to: from.id,
        });

        // Check if recipient is online via Redis
        const recipientSocketId = await redisClient.hGet('onlineUsers', to.id);
        if (recipientSocketId) {
          // Fetching users of "to" and "from" is NOT the best approach but it will do it for now
          // TODO: Implement a duplicated approach
          // Store user "to" and "from" in the mongodb document itself and
          // and implement a data sync method to keep the data in sync
          const fromUser = await getUser({
            where: {
              id: from.id,
            },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              username: true,
            },
          });
          const toUser = await getUser({
            where: {
              id: to.id,
            },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              username: true,
            },
          });

          // Deliver message in real time
          io.to(recipientSocketId).emit('receive_message', {
            from: fromUser,
            to: toUser,
            timestamp: newMessage.createdAt,
            message,
          });
        } else {
          // If offline, send a push notification if subscription exists
          const subscriptionString = await redisClient.hGet(
            'pushSubscriptions',
            to.id,
          );
          if (subscriptionString) {
            const subscription = JSON.parse(subscriptionString);
            const payload = JSON.stringify({
              title: 'New Message',
              body: message,
            });
            // webpush.sendNotification(subscription, payload)
            //   .catch(error => console.error('Push notification error:', error));
          }
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
          console.log(`User ${userId} disconnected`);
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
