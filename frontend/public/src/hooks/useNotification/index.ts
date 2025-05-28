'use client';

import { getNotifications } from '@/services/notifications';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRootStore } from '@/store';
import { useUser } from '@/hooks';

const useNotification = () => {
  const { notifications } = useRootStore();
  const {
    user: { id },
  } = useUser();

  const mutation = useMutation({
    mutationKey: ['notifications'],
    mutationFn: async () => {
      if (id) {
        const response = await getNotifications({
          userId: id,
          page: notifications.currentPage,
          pageSize: notifications.pageSize,
        });
        return response;
      }
    },
    onSuccess: (response) => {
      notifications.setNotificationValue({
        data: response.data,
        totalPages: response.totalPages,
        currentPage: response.currentPage,
        pageSize: response.pageSize,
      });
    },
  });

  useEffect(() => {
    if (id) {
      mutation.mutate();
    }
  }, [
    id,
    notifications.pageSize,
    notifications.currentPage,
    notifications.totalPages,
  ]);

  const onChangePage = (page: number) => {
    notifications.setNotificationValue(
      { currentPage: page },
      'notifications/setCurrentPage'
    );
  };

  useEffect(() => {
    notifications.setNotificationValue(
      { data: notifications.data },
      'notifications/getNotifications'
    );
  }, [notifications.data]);

  return { notifications, mutation, onChangePage };
};

export default useNotification;
