import { NotificationsStore } from './types';
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
    socket: undefined,
    setNotificationValue: (params, actionName = 'notifications/setValue') => {
      set(
        ({ notifications }) => ({
          notifications: {
            ...notifications,
            notifications: params.notifications ?? notifications.notifications,
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
  },
});
