import type { Notification, Type } from '@/store/notifications/types';

export type MessageProps = {
  note: Notification;
};

export type Icons = {
  type: Type;
  name: string;
  backgroundColor: string;
  color: string;
  title: string;
}[];
