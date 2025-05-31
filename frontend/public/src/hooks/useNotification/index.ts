'use client';

import { useEffect, useState } from 'react';

import { Filter } from './types';
import { getNotifications } from '@/services/notifications';
import { useMutation } from '@tanstack/react-query';
import { useRootStore } from '@/store';
import { useUser } from '@/hooks';

const useNotification = () => {
  const { notifications } = useRootStore();
  const {
    user: { id },
  } = useUser();
  const [filterType, setFilterType] = useState<Filter>('all');

  const mutation = useMutation({
    mutationKey: ['notifications'],
    mutationFn: async () => {
      if (id) {
        const response = await getNotifications({
          userId: id,
          page: notifications.currentPage,
          pageSize: notifications.pageSize,
          ...(filterType !== 'all' && {
            type: filterType,
          }),
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
    filterType,
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

  const onChangeFilterType = (
    filter: 'all' | 'trades' | 'security' | 'system'
  ) => {
    setFilterType(filter);
  };

  return {
    notifications,
    mutation,
    filterType,
    onChangePage,
    onChangeFilterType,
  };
};

export default useNotification;
