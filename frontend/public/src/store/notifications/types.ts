import { Socket } from 'socket.io-client';

export type Notification = {
  id: string;
  message: string;
  whenSeen: string;
  url: string;
  createdAt: string;
};

export type NotificationsSetter = {
  data?: Notification[];
  hasNewNotification?: boolean;
  socket?: Socket;
  totalPages?: number;
  currentPage?: number;
  pageSize?: number;
};

export type Value = NotificationsSetter;

export type NotificationsStore = {
  notifications: {
    data: Notification[];
    hasNewNotification: boolean;
    socket?: Socket;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    setNotificationValue: (
      value: Value,
      action?: `notifications/${string}`
    ) => void;
    setSocket: (socket: Socket) => void;
    setHasNewNotification: (hasNotification: boolean) => void;
  };
};
