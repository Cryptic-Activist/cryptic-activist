import type { ReactNode } from 'react';

export type SubmitProps = {
  type: 'submit' | 'button';
  onClick?: () => void;
  children: ReactNode;
};
