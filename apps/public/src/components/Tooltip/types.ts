import { ReactElement } from 'react';

export type TooltipProps = {
  children: ReactElement[];
  position?: 'left' | 'right' | 'top' | 'bottom';
  spacing?: number;
};
