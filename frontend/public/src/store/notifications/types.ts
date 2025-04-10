import { Socket } from 'socket.io-client';

export type Notification = {
  id: string;
  message: string;
  whenSeen: string;
  url: string;
  createdAt: string;
};

export type NotificationsSetter = {
  notifications?: Notification[];
  hasNewNotification?: boolean;
  socket?: Socket;
};

export type Value = NotificationsSetter;

export type NotificationsStore = {
  notifications: {
    notifications: Notification[];
    hasNewNotification: boolean;
    socket?: Socket;
    setNotificationValue: (
      value: Value,
      action?: `notifications/${string}`
    ) => void;
    setSocket: (socket: Socket) => void;
    setHasNewNotification: (hasNotification: boolean) => void;
  };
};
