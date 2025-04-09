import { ReactElement } from 'react';

export type TemplateProps = {
  children: ReactElement | ReactElement[];
  width?: string;
  heading?: string;
  successMessage?: string;
  allowClose?: boolean;
  name?: 'privateKeys' | 'verifyAccount';
};
