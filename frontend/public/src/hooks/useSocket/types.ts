import { UserSetter } from '@/store/user/types';

export type UseSocketParams = {
  roomId?: string;
  user?: UserSetter;
};

export type Message = {
  id: string;
  content: string;
  user: string;
  timestamp: number;
};
