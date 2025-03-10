import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

import { ReactElement } from 'react';

type InputType = 'text' | 'email' | 'password' | 'hidden';

export type InputProps = {
  name?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  value?: string;
  onChange?: (value: any) => void;
  register?: any;
  type?: InputType;
  placeholder?: string;
  label?: string;
  sideButton?: ReactElement;
  errorMessage?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  width?: string;
  focus?: boolean;
};
