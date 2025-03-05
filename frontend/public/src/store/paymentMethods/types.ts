import { PaymentMethod } from '@/store/paymentMethod/types';

export type PaymentMethodsState = {
  data?: PaymentMethod[];
  loading: boolean;
  fetched: boolean;
  errors: string[];
};

export type PaymentMethodsSetter = PaymentMethodsState;
