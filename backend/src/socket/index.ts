import {} from // createOnlineUser,
// deleteOnlineUser,
// getOnlineUser,
// setup,
// createSystemMessage,
'base-ca';

import {
  ADMIN_BOT_NAMES,
  ADMIN_JOIN_MESSAGE,
  ADMIN_MESSAGE,
  DISCONNECT,
  END,
  GO_ONLINE,
  JOIN,
  MESSAGE,
  ROOM_DATA,
  SEND_SYSTEM_MESSAGE,
} from 'cryptic-utils';

import { Socket } from 'socket.io';

// import {
//   addTrader,
//   getUser,
//   getUsersInRoom,
//   removeUser,
// } from '@utils/helpers/users';

export default function socketEvents(io) {
  // setup(true);

  io.on('connection', (socket: Socket) => {
    socket.on(GO_ONLINE, async ({ user }) => {
      // const userObj = await getOnlineUser({ user_id: user.id });
      // if (!userObj) {
      //   await createOnlineUser({ socket_id: socket.id, user_id: user.id });
      // }
    });

    socket.on(JOIN, ({ room, trader, vendor }) => {
      socket.join(room);

      // console.log(room, trader, vendor);

      socket.emit(ADMIN_MESSAGE, {
        user: ADMIN_BOT_NAMES,
        message: ADMIN_JOIN_MESSAGE(trader, vendor),
      });

      socket.broadcast.to(room).emit(MESSAGE, { user: { text: '' } });

      io.to(room).emit(ROOM_DATA, {
        room: {
          data: '',
        },
      });
    });

    // socket.on(SEND_CHAT_MESSAGE, ({ user, message }) => {});

    socket.on(END, async ({ user }) => {
      // await deleteOnlineUser({ user_id: user.id });
    });

    // socket.on(ALERT_NEW_TRADE_STARTED, async () => {});

    socket.on(SEND_SYSTEM_MESSAGE, async ({ user_id, trade_id, message }) => {
      // await createSystemMessage({ user_id, trade_id, message });
    });

    socket.on(DISCONNECT, async () => {
      // const userObj = await getOnlineUser({ socket_id: socket.id });
      // if (userObj) {
      //   await deleteOnlineUser({ socket_id: socket.id });
      // }
    });
  });
}
