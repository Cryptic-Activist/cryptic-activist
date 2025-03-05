import type {
  PaymentMethodCategoriesSetter,
  PaymentMethodCategoriesState,
} from './types';

import { fetchPaymentMethodCategories } from '@/services/paymentMethodCategories';
import { map } from 'nanostores';

export const $paymentMethodCategories = map<PaymentMethodCategoriesState>({
  errors: [],
  fetched: false,
  loading: false,
});

const setter = ({
  errors,
  fetched,
  loading,
  data,
}: PaymentMethodCategoriesSetter) => {
  const paymentMethodCategories = $paymentMethodCategories.get();

  const localErrors = errors ?? paymentMethodCategories.errors;
  const localFetched = fetched ?? paymentMethodCategories.fetched;
  const localLoading = loading ?? paymentMethodCategories.loading;
  const localData = data ?? paymentMethodCategories.data;

  $paymentMethodCategories.set({
    errors: localErrors,
    fetched: localFetched,
    loading: localLoading,
    data: localData,
  });
};

export const getPaymentMethodCategories = async () => {
  const paymentMethodCategories = await fetchPaymentMethodCategories();

  if (!paymentMethodCategories) {
    setter({
      errors: ['Unable to fetch payment method categories'],
      fetched: true,
      loading: false,
    });
  }

  setter({
    errors: [],
    fetched: true,
    loading: false,
    data: paymentMethodCategories!.data.results,
  });
};
