import { PaymentMethodCategoriesStore } from './types';
import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';
import { fetchPaymentMethodCategories } from '@/services/paymentMethodCategories';

export const usePaymentMethodCategoriesSlice: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  PaymentMethodCategoriesStore
> = (set, get) => ({
  paymentMethodCategories: {
    data: undefined,
    setPaymentMethodCategoriesValue: (
      params,
      actionName = 'paymentMethodCategories/setValue'
    ) => {
      set(
        ({ paymentMethodCategories }) => ({
          paymentMethodCategories: {
            ...paymentMethodCategories,
            data: params.data ?? paymentMethodCategories.data,
          },
        }),
        false,
        actionName
      );
    },
    getPaymentMethodCategories: async () => {
      const paymentMethodCategories = await fetchPaymentMethodCategories();
      const setValue =
        get().paymentMethodCategories.setPaymentMethodCategoriesValue;

      setValue(
        { data: paymentMethodCategories },
        'paymentMethodCategories/setPaymentMethodCategories'
      );
    },
  },
});
