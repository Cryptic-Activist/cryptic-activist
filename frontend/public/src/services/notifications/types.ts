import { Type } from '@/store/notifications/types';

export type GetNotificationParams = {
  userId: string;
  page: number;
  pageSize: number;
  type?: Type;
};
