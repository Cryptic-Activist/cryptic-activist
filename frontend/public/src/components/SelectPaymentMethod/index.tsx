'use client';

import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import { FaSearch } from 'react-icons/fa';
import { PaymentMethod } from '@/zustand/paymentMethod/types';
import { PaymentMethodCategory } from '@/zustand/paymentMethodCategories/types';
import { SelectPaymentMethodProps } from './types';
import { searchArrayOfObjects } from '@/utils';
import styles from './index.module.scss';
import { usePaymentMethods } from '@/hooks';

const SelectPaymentMethod: FC<SelectPaymentMethodProps> = ({
  handlePaymentMethod,
  paymentMethodId,
}) => {
  const {
    paymentMethodCategories,
    paymentMethods,
    getPaymentMethodsByCategory,
  } = usePaymentMethods(true);

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<
    null | number
  >(null);
  const [selectedPaymentMethodIndex, setSelectedPaymentMethodIndex] = useState<
    null | number
  >(null);
  const [localPaymentMethodCategories, setLocalPaymentMethodCategories] =
    useState<PaymentMethodCategory[] | undefined>(paymentMethodCategories.data);
  const [localPaymentMethods, setLocalPaymentMethods] = useState<
    PaymentMethod[] | undefined
  >(paymentMethods.data);

  const selectCategory = (id: string, index: number) => {
    setSelectedCategoryIndex(index);
    getPaymentMethodsByCategory(id);
  };

  const selectPaymentMethod = (id: string, index: number) => {
    setSelectedPaymentMethodIndex(index);
    handlePaymentMethod(id);
  };

  const filterPaymentMethods = (event: ChangeEvent<HTMLInputElement>) => {
    if (paymentMethods.data) {
      const value = event.currentTarget.value;
      const filtered = searchArrayOfObjects(
        paymentMethods.data,
        'name',
        value
      ) as PaymentMethod[];
      setLocalPaymentMethods(filtered);
      setSelectedPaymentMethodIndex(null);
    }
  };

  useEffect(() => {
    setLocalPaymentMethods(paymentMethods.data);
    setLocalPaymentMethodCategories(paymentMethodCategories.data);
  }, [paymentMethods.data, paymentMethodCategories.data]);

  useEffect(() => {
    if (paymentMethodId && paymentMethods.data) {
      const index = paymentMethods.data?.findIndex(
        (paymentMethod) => paymentMethod.id === paymentMethodId
      );
      if (index > 0) {
        setSelectedPaymentMethodIndex(index);
      }
    }
  }, [paymentMethodId, paymentMethods.data]);

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          placeholder="Search payment methods"
          onChange={filterPaymentMethods}
        />
        <button className={styles.searchButton}>
          <FaSearch size={16} />
        </button>
      </div>
      <div className={styles.listContainer}>
        <ul className={styles.categoriesList}>
          {localPaymentMethodCategories?.map((category, index) => {
            const selected =
              index === selectedCategoryIndex ? styles.selected : '';
            return (
              <li key={category.id} className={selected}>
                <button onClick={() => selectCategory(category.id, index)}>
                  {category.name}
                </button>
              </li>
            );
          })}
        </ul>
        <ul className={styles.paymentMethodsList}>
          {localPaymentMethods?.map((paymentMethod, index) => {
            const selected =
              index === selectedPaymentMethodIndex ? styles.selected : '';
            return (
              <li key={paymentMethod.id} className={selected}>
                <button
                  onClick={() => selectPaymentMethod(paymentMethod.id, index)}
                >
                  {paymentMethod.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SelectPaymentMethod;
