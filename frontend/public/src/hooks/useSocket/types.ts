import { User } from '@/store/trade/types';

export type UseSocketParams = {
  roomId?: string;
  user?: User;
};

export type Message = {
  id: string;
  content: string;
  user: User;
  timestamp: number;
};
