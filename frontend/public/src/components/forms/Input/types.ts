import { ReactElement } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

type InputType = 'text' | 'email' | 'password' | 'hidden';

export type InputProps = {
  name?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  value?: string;
  onChange?: any;
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
