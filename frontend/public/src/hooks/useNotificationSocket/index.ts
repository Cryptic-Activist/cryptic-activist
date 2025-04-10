'use client';

import { BACKEND } from '@/constants';
import { UseSocketParams } from './types';
import io from 'socket.io-client';
import { useApp } from '@/hooks';
import { useEffect } from 'react';
import { useRootStore } from '@/store';

const useNotificationSocket = ({ user }: UseSocketParams) => {
  const { notifications } = useRootStore();
  const { addToast } = useApp();

  useEffect(() => {
    if (user?.id) {
      const newSocket = io(BACKEND, {
        transports: ['websocket'],
      });

      newSocket.on('connect', () => {
        newSocket.emit('join', { user });
      });

      newSocket.on('notification_system', () => {
        addToast('info', 'New message received', 10000);
        notifications.setHasNewNotification(true);
      });

      notifications.setSocket(newSocket);

      return () => {
        if (newSocket) {
          newSocket.disconnect();
        }
      };
    }
  }, [user]);

  return {};
};

export default useNotificationSocket;
