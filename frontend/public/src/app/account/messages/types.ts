import type { Notification, Type } from '@/store/notifications/types';

import { Filter } from '@/hooks/useNotification/types';

export type MessageProps = {
  note: Notification;
};

export type Icons = {
  type: Type;
  name: string;
  backgroundColor: string;
  color: string;
  title: string;
  mainActionButtonLabel?: string;
}[];

export type Filters = {
  label: string;
  filter: Filter;
}[];
