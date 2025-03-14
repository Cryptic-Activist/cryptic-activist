'use client';

import { useEffect, useState } from 'react';

import { PaymentMethod } from '@/store/paymentMethod/types';
import { toLowerCase } from '@/utils';
import { useApp } from '@/hooks';
import { useRootStore } from '@/store';

const usePaymentMethods = (fetch?: boolean) => {
  const { setValue } = useApp();

  const { paymentMethods, paymentMethodCategories } = useRootStore();

  const [paymentMethodsList, setPaymentMethodsList] = useState(
    paymentMethods.data
  );

  const setPaymentMethod = (paymentMethod: PaymentMethod) => {
    setValue(
      {
        defaults: {
          paymentMethod: { id: paymentMethod.id, name: paymentMethod.name },
        },
      },
      'app/setDefaultPaymentMethod'
    );
  };

  // const getPaymentMethod = (symbol: FiatSymbol) => {
  //   if (!paymentMethods.data) {
  //     return null;
  //   }

  //   const paymentMethod = paymentMethods.data.filter(
  //     (f) => f.symbol === symbol
  //   );

  //   const hasFound = paymentMethod.length > 0;

  //   if (!hasFound) {
  //     return null;
  //   }

  //   return paymentMethod[0];
  // };

  const filterPaymentMethods = (term: string) => {
    if (!paymentMethods.data) return;
    const filtered = paymentMethods.data.filter((paymentMethod) => {
      const lowerFiatName = toLowerCase(paymentMethod.name);
      const lowerTerm = toLowerCase(term);

      return lowerFiatName.includes(lowerTerm);
    });

    setPaymentMethodsList(filtered);
  };

  useEffect(() => {
    if (fetch) {
      paymentMethodCategories.getPaymentMethodCategories();
    }
  }, [fetch]);

  return {
    paymentMethods,
    paymentMethodCategories,
    paymentMethodsList,
    getPaymentMethods: paymentMethods.getPaymentMethods,
    // getPaymentMethod,
    getPaymentMethodCategories:
      paymentMethodCategories.getPaymentMethodCategories,
    getPaymentMethodsByCategory: paymentMethods.getPaymentMethodsByCategory,
    setPaymentMethod,
    filterPaymentMethods,
  };
};

export default usePaymentMethods;
