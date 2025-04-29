import { UserSetter } from '@/store/user/types';

export type Size = 'xSmall' | 'small' | 'medium' | 'large';

export type ProfileImageProps = {
  size?: Size;
  user?: UserSetter;
  profileColor?: string;
  firstName?: string;
  lastName?: string;
  height?: number;
  width?: number;
};
