import { ReactElement } from 'react';

export type FormProps = {
  defaultValues?: any;
  onSubmit: any;
  children: ReactElement | ReactElement[];
  resolver: any;
};
