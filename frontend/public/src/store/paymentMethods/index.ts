import {
  fetchPaymentMethods,
  fetchPaymentMethodsByCategory,
} from '@/services/paymentMethods';

import { PaymentMethodsStore } from './types';
import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';

export const usePaymentMethodsStore: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  PaymentMethodsStore
> = (set, get) => ({
  paymentMethods: {
    data: undefined,
    setPaymentMethodsValue: (
      params,
      actionName = 'paymentMethods/setValue'
    ) => {
      set(
        ({ paymentMethods }) => ({
          paymentMethods: {
            ...paymentMethods,
            data: params.data ?? paymentMethods.data,
          },
        }),
        false,
        actionName
      );
    },
    getPaymentMethods: async () => {
      const paymentMethods = await fetchPaymentMethods();
      const setValue = get().paymentMethods.setPaymentMethodsValue;

      setValue({ data: paymentMethods }, 'paymentMethods/setPaymentMethods');
    },
    getPaymentMethodsByCategory: async (categoryId) => {
      const paymentMethods = await fetchPaymentMethodsByCategory(categoryId);
      const setValue = get().paymentMethods.setPaymentMethodsValue;

      setValue(
        {
          data: paymentMethods,
        },
        'paymentMethods/getPaymentMethodByCategory'
      );
    },
  },
});
