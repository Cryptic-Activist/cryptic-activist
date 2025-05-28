import { Notification, NotificationsStore } from './types';

import { RootStore } from '../root/types';
import { Socket } from 'socket.io-client';
import { StateCreator } from 'zustand';

export const useNotificationsSlice: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  NotificationsStore
> = (set, get) => ({
  notifications: {
    data: [],
    hasNewNotification: false,
    socket: undefined,
    totalPages: 1,
    currentPage: 1,
    pageSize: 10,
    setNotificationValue: (params, actionName = 'notifications/setValue') => {
      set(
        ({ notifications }) => ({
          notifications: {
            ...notifications,
            data: params.data ?? notifications.data,
            totalPages: params.totalPages ?? notifications.totalPages,
            currentPage: params.currentPage ?? notifications.currentPage,
            pageSize: params.pageSize ?? notifications.pageSize,
            hasNewNotification:
              params.hasNewNotification ?? notifications.hasNewNotification,
            socket: params.socket ?? notifications.socket,
          },
        }),
        false,
        actionName
      );
    },
    setSocket: (socket: Socket) => {
      const setValue = get().notifications.setNotificationValue;
      setValue({ socket }, 'notifications/setSocket');
    },
    appendNotification: (notification: Notification) => {
      const prevNotification = get().notifications.data;
      const setValue = get().notifications.setNotificationValue;

      setValue(
        { data: [...prevNotification, notification] },
        'notifications/appendNotification'
      );
    },
    setHasNewNotification: (hasNotification: boolean) => {
      const setValue = get().notifications.setNotificationValue;

      setValue(
        { hasNewNotification: hasNotification },
        'notifications/setHasNewNotification'
      );
    },
  },
});
