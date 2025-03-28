import { FieldValues, SubmitHandler } from 'react-hook-form';

export type OnSubmitPayload = {
  username: string;
  password: string;
};

export type OnSubmit = SubmitHandler<FieldValues | OnSubmitPayload>;
