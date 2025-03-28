import { ReactElement } from 'react';

export type Theme = 'primary' | 'secondary' | 'ghost' | 'transparent';

export type ButtonProps = {
  type?: 'button' | 'submit';
  href?: string;
  children: string | ReactElement[];
  theme?: Theme;
  padding?: string;
  align?: 'left' | 'center' | 'right';
  onClick?: () => void;
};
