'use client';

import {
  $paymentMethodCategories,
  $paymentMethods,
  getPaymentMethodCategories,
  getPaymentMethods,
  getPaymentMethodsByCategory,
} from '@/store';
import { useEffect, useState } from 'react';

import { PaymentMethod } from '@/store/paymentMethod/types';
import { toLowerCase } from '@/utils';
import { useApp } from '@/hooks';
import { useStore } from '@nanostores/react';

const usePaymentMethods = (fetch?: boolean) => {
  const { setValue } = useApp();

  const paymentMethods = useStore($paymentMethods);
  const paymentMethodCategories = useStore($paymentMethodCategories);
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
      getPaymentMethodCategories();
    }
  }, [fetch]);

  return {
    paymentMethods,
    paymentMethodCategories,
    paymentMethodsList,
    getPaymentMethods,
    // getPaymentMethod,
    getPaymentMethodCategories,
    getPaymentMethodsByCategory,
    setPaymentMethod,
    filterPaymentMethods,
  };
};

export default usePaymentMethods;
