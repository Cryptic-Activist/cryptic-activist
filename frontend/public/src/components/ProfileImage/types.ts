import { UserSetter } from '@/store/user/types';

export type Size = 'xSmall' | 'small' | 'medium' | 'large';

export type ProfileImageProps = {
  size?: Size;
  user?: UserSetter;
  height?: number;
  width?: number;
};
