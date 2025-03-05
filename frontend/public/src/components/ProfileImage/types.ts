import { User } from '@/store/user/types';

export type ProfileImageProps = {
  size?: 'xSmall' | 'small' | 'medium' | 'large';
  user?: User;
};
