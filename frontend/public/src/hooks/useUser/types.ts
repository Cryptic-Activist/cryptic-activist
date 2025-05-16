import { FieldValues, SubmitHandler } from 'react-hook-form';

export type OnSubmitPayload = {
  usernameOrEmail: string;
  password: string;
};

export type OnSubmit = SubmitHandler<FieldValues | OnSubmitPayload>;

export type OnSubmit2FAPayload = {
  token2FA: string;
};

export type OnSubmit2FA = SubmitHandler<FieldValues | OnSubmit2FAPayload>;
