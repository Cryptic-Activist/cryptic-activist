import { DefaultEventsMap, Server, Socket as SocketIO } from 'socket.io';
import { Message, User, UserInfo } from './types';

const socketHandler = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
) => {
  // Store active users and their room information
  const users = new Map<string, UserInfo>();
  const rooms = new Map<string, Set<string>>();
  const roomMessages = new Map<string, Message[]>();

  io.on('connection', (socket: SocketIO) => {
    console.log('New client connected:', socket.id);

    // Join trade room
    socket.on('join_room', (data: { roomId: string; user: User }) => {
      const { roomId, user } = data;
      console.log(`Room ${roomId} joined`);

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
    socket.on('send_message', (data: { roomId: string; content: string }) => {
      const { roomId, content } = data;
      console.log('message sent to room' + roomId);
      const user = users.get(socket.id);

      console.log({ data });

      if (!user) return;

      const newMessage: Message = {
        id: `msg_${Date.now()}`,
        senderId: socket.id,
        content,
        user: user.user,
        timestamp: Date.now(),
      };

      // Store message in room history
      const roomMessageHistory = roomMessages.get(roomId) || [];
      roomMessageHistory.push(newMessage);
      roomMessages.set(roomId, roomMessageHistory);

      // Broadcast to room
      io.to(roomId).emit('receive_message', newMessage);
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
    socket.on('disconnect', () => {
      console.log('disconnected');
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
