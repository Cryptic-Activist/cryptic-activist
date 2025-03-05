import { map } from 'nanostores';

import type {
  PaymentMethod,
  PaymentMethodSetter,
  PaymentMethodState,
} from './types';

export const $paymentMethod = map<PaymentMethodState>({});

const setter = ({ id, name }: PaymentMethodSetter) => {
  $paymentMethod.set({
    id,
    name,
  });
};

export const setPaymentMethod = (paymentMethod: PaymentMethod) => {
  setter(paymentMethod);
};
