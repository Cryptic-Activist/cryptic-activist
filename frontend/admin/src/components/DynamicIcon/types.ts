import { ComponentType } from 'react';

export type DynamicIconProps = {
  iconName: string;
  size?: number;
  color?: string;
  className?: string;
};

export type IconPacks = {
  [key: string]: { [key: string]: ComponentType<any> };
};
