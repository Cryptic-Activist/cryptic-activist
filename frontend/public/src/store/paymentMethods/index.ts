import { map } from 'nanostores';

import {
  fetchPaymentMethods,
  fetchPaymentMethodsByCategory,
} from '@/services/paymentMethods';
import type { PaymentMethodsSetter, PaymentMethodsState } from './types';

export const $paymentMethods = map<PaymentMethodsState>({
  errors: [],
  fetched: false,
  loading: false,
});

const setter = ({ errors, fetched, loading, data }: PaymentMethodsSetter) => {
  const paymentMethods = $paymentMethods.get();

  const localErrors = errors ?? paymentMethods.errors;
  const localFetched = fetched ?? paymentMethods.fetched;
  const localLoading = loading ?? paymentMethods.loading;
  const localData = data ?? paymentMethods.data;

  $paymentMethods.set({
    errors: localErrors,
    fetched: localFetched,
    loading: localLoading,
    data: localData,
  });
};

export const getPaymentMethods = async () => {
  const paymentMethods = await fetchPaymentMethods();

  if (!paymentMethods) {
    setter({
      errors: ['Unable to fetch payment methods'],
      fetched: true,
      loading: false,
    });
  }

  setter({
    errors: [],
    fetched: true,
    loading: false,
    data: paymentMethods!.data.results,
  });
};

export const getPaymentMethodsByCategory = async (categoryId: string) => {
  const paymentMethods = await fetchPaymentMethodsByCategory(categoryId);

  if (!paymentMethods) {
    setter({
      errors: ['Unable to fetch payment methods'],
      fetched: true,
      loading: false,
    });
  }

  setter({
    errors: [],
    fetched: true,
    loading: false,
    data: paymentMethods!.data.results,
  });
};
