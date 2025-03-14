import { User } from '@/zustand/user/types';

export type ProfileImageProps = {
  size?: 'xSmall' | 'small' | 'medium' | 'large';
  user?: User;
};
