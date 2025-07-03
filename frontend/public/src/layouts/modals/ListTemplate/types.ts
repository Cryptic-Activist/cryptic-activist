import { ReactElement } from 'react';

export type ListTemplateProps = {
  children: ReactElement | ReactElement[];
  width?: string;
  height?: string;
  heading?: string;
  onFilter?: (term: string) => void;
};
