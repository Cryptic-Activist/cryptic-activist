import { FieldValues, SubmitHandler } from 'react-hook-form';

export type OnSubmitRequestPayload = {
  unique: string;
};

export type OnSubmitPayload = {
  password: string;
  passwordConfirm: string;
};

export type OnSubmitRequest = SubmitHandler<
  FieldValues | OnSubmitRequestPayload
>;

export type OnSubmit = SubmitHandler<FieldValues | OnSubmitPayload>;
