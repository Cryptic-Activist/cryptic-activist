'use client';

import {
  useHorizontalScroll,
  useNavigationBar,
  usePaymentMethods,
} from '@/hooks';

import { ListTemplate } from '@/layouts/modals';
import { PaymentMethod } from '@/zustand/paymentMethod/types';
import styles from './index.module.scss';
import { toCapitalize } from '@/utils';
import { useRef } from 'react';

const PaymentMethods = () => {
  const ref = useRef<HTMLUListElement | null>(null);
  const _scroll = useHorizontalScroll(ref);
  const { paymentMethodsList, setPaymentMethod, filterPaymentMethods } =
    usePaymentMethods();
  const { toggleModal } = useNavigationBar();

  const selectPaymentMethod = (paymentMethod: PaymentMethod) => {
    setPaymentMethod(paymentMethod);
    toggleModal('paymentMethods');
  };

  return (
    <ListTemplate
      width="20vw"
      height="25vh"
      heading="Payment Methods"
      onFilter={filterPaymentMethods}
    >
      <ul className={styles.list} ref={ref}>
        {paymentMethodsList?.map((paymentMethod, index) => (
          <li key={index}>
            <button onClick={() => selectPaymentMethod(paymentMethod)}>
              {toCapitalize(paymentMethod.name ?? '')}
            </button>
          </li>
        ))}
      </ul>
    </ListTemplate>
  );
};

export default PaymentMethods;
