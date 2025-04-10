import { Socket } from 'socket.io-client';

export type Notification = {
  id: string;
  name: string;
  symbol: string;
  country: string;
};

export type NotificationsSetter = {
  notifications?: Notification[];
  socket?: Socket;
};

export type Value = NotificationsSetter;

export type NotificationsStore = {
  notifications: {
    notifications: Notification[];
    socket?: Socket;
    setNotificationValue: (
      value: Value,
      action?: `notifications/${string}`
    ) => void;
    setSocket: (socket: Socket) => void;
  };
};
