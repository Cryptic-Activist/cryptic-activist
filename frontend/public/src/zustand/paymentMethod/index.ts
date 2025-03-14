import { PaymentMethodStore } from './types';
import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';

export const usePaymentMethodStore: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  PaymentMethodStore
> = (set, get) => ({
  paymentMethod: {
    id: undefined,
    name: undefined,

    setPaymentMethodValue: (params, actionName = 'paymentMethod/setValue') => {
      set(
        ({ paymentMethod }) => ({
          paymentMethod: {
            ...paymentMethod,
            id: params.id ?? paymentMethod.id,
            name: params.name ?? paymentMethod.name,
          },
        }),
        false,
        actionName
      );
    },
    setPaymentMethod: (paymentMethod) => {
      const setValue = get().paymentMethod.setPaymentMethodValue;
      setValue(paymentMethod, 'paymentMethod/setPaymentMethod');
    },
  },
});
