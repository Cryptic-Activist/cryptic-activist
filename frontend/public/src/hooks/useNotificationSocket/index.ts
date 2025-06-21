'use client';

import { UseSocketParams } from './types';
import { getSocket } from '@/services/socket';
import { useApp } from '@/hooks';
import { useEffect } from 'react';
import { useRootStore } from '@/store';

const useNotificationSocket = ({ user }: UseSocketParams) => {
  const { notifications } = useRootStore();
  const { addToast } = useApp();

  useEffect(() => {
    if (user?.id) {
      const socket = getSocket();

      if (!socket.connected) {
        socket.connect();
      }

      socket.emit('join', { user });

      socket.on('notification_system', () => {
        addToast('info', 'New message received', 10000);
        notifications.setHasNewNotification(true);
        const notificationSound = new Audio('/sounds/notification-default.mp3');
        notificationSound.play().catch((error) => {
          console.error('Error playing notification sound:', error);
        });
      });

      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    }
  }, [user]);

  return {};
};

export default useNotificationSocket;
