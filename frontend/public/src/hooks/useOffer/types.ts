import { FieldValues, SubmitHandler } from 'react-hook-form';

export type OnSubmitPayload = {
  amount: string;
};

export type OnSubmit = SubmitHandler<FieldValues | OnSubmitPayload>;
