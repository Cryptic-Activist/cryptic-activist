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
    notifications: [],
    hasNewNotification: false,
    socket: undefined,
    setNotificationValue: (params, actionName = 'notifications/setValue') => {
      set(
        ({ notifications }) => ({
          notifications: {
            ...notifications,
            notifications: params.notifications ?? notifications.notifications,
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
      const prevNotification = get().notifications.notifications;
      const setValue = get().notifications.setNotificationValue;

      setValue(
        { notifications: [...prevNotification, notification] },
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
