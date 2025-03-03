import { Socket } from 'socket.io';
import {
  addTrader,
  getUser,
  getUsersInRoom,
  removeUser,
} from '@utils/helpers/users';

export default function socketEvents(io) {
  io.on('connection', (socket: Socket) => {
    socket.on('joinTrader', ({ trader, vendor, roomId }, callback) => {
      const { user, errors } = addTrader(socket.id, trader, roomId);

      if (errors) return callback(errors);

      socket.join(user.roomId);

      socket.emit('adminMessage', {
        user: {
          names: {
            first_name: 'Cryptic Activist',
            last_name: 'Bot',
          },
        },
        message: `${user.names.first_name} ${user.names.last_name}, welcome to the room.`,
      });

      socket.emit('adminMessage', {
        user: {
          names: {
            first_name: 'Cryptic Activist',
            last_name: 'Bot',
          },
        },
        message: `The vendor will arrive really soon.\n${vendor.names.first_name} ${vendor.names.last_name} was last seen 7 minutes ago.`,
      });

      socket.broadcast.to(user.roomId).emit('message', {
        user: {
          names: {
            first_name: 'Cryptic Activist',
            last_name: 'Bot',
          },
        },
        message: `${user.names.first_name} ${user.names.last_name}, has joined!`,
      });

      io.to(user.roomId).emit('roomData', {
        room: user.roomId,
        users: getUsersInRoom(user.roomId),
      });

      callback();
    });

    socket.on('sendMessage', (message) => {
      const user = getUser(socket.id);

      io.to(user.roomId).emit('message', { user: user.name, message });
    });

    socket.on('disconnect', () => {
      const user = removeUser(socket.id);

      if (user) {
        io.to(user.room).emit('message', {
          user: {
            name: 'admin',
          },
          text: `${user.name} has left.`,
        });
        io.to(user.room).emit('roomData', {
          room: user.room,
          users: getUsersInRoom(user.room),
        });
      }
    });

    socket.on('traderPaidSignal', ({ trader }) => {
      socket.emit('adminMessage', {
        user: {
          names: {
            first_name: 'Cryptic Activist',
            last_name: 'Bot',
          },
        },
        message: `${trader.names.first_name} ${trader.names.last_name} sent a paid signal.`,
      });
    });
  });
}
