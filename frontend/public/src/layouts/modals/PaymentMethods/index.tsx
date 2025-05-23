'use client';

import { useNavigationBar, usePaymentMethods } from '@/hooks';

import { ListTemplate } from '@/layouts/modals';
import { PaymentMethod } from '@/store/paymentMethod/types';
import styles from './index.module.scss';
import { toCapitalize } from '@/utils';

const PaymentMethods = () => {
  const { paymentMethodsList, setPaymentMethod, filterPaymentMethods } =
    usePaymentMethods();

  const { toggleModal } = useNavigationBar();

  const selectPaymentMethod = (paymentMethod: PaymentMethod) => {
    setPaymentMethod(paymentMethod);
    toggleModal('paymentMethods');
  };

  return (
    <ListTemplate
      width="30rem"
      height="70vh"
      heading="Payment Methods"
      onFilter={filterPaymentMethods}
    >
      <ul className={styles.list}>
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
