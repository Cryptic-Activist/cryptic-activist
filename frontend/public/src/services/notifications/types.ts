import { Filter } from '@/hooks/useNotification/types';

export type GetNotificationParams = {
  userId: string;
  page: number;
  pageSize: number;
  type?: Filter;
};
