import { FieldValues, SubmitHandler } from 'react-hook-form';

export type OnSubmitPayload = {
  names: {
    firstName: string;
    lastName: string;
  };
  username: string;
  referralCode: string;
  email: string;
  confirmPassword: string;
  password: string;
};

export type OnSubmit = SubmitHandler<FieldValues | OnSubmitPayload>;
