'use client';

import { useApp, useNavigationBar } from '@/hooks';
import { toCapitalize, toUpperCase } from '@/utils';
import { FC, HTMLInputTypeAttribute } from 'react';
import styles from './index.module.scss';
import { SelectWithInput } from './types';

const NO_DATA = 'No Data';

const SelectorWithInput: FC<SelectWithInput> = ({ type }) => {
  const { app } = useApp();
  const { toggleModal } = useNavigationBar();
  const { defaults, type: typeApp } = app;
  const { fiat, paymentMethod } = defaults;

  const getLabel = () => {
    if (type === 'payment-method' && typeApp === 'buy') {
      return 'Payment Method';
    }
    if (type === 'payment-method' && typeApp === 'sell') {
      return 'Get Paid In';
    }
    if (type === 'amount' && typeApp === 'buy') {
      return 'You Pay';
    }
    if (type === 'amount' && typeApp === 'sell') {
      return 'You Get';
    }
  };

  const getPlaceholder = () => {
    if (type === 'payment-method') {
      return 'All Payment Methods';
    }
    if (type === 'amount') {
      return 'Any amount';
    }

    return NO_DATA;
  };

  const getButtonLabel = () => {
    if (type === 'amount' && fiat) {
      return toUpperCase(fiat?.symbol);
    }
    if (type === 'payment-method') {
      if (!paymentMethod) {
        return 'All';
      }
      return toCapitalize(paymentMethod.name);
    }

    return NO_DATA;
  };

  const getInputType = (): HTMLInputTypeAttribute => {
    if (type === 'amount') {
      return 'number';
    }

    return 'text';
  };

  const handleButton = () => {
    if (type === 'amount') {
      toggleModal('fiats');
    }
    if (type === 'payment-method') {
      toggleModal('paymentMethods');
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={styles.input}>
        {getLabel()}
      </label>
      <div className={styles.selector}>
        <input
          type={getInputType()}
          id={styles.input}
          placeholder={getPlaceholder()}
        />
        <button onClick={handleButton}>{getButtonLabel()}</button>
      </div>
    </div>
  );
};

export default SelectorWithInput;
