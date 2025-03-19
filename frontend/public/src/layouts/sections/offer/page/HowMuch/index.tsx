import { Form, Input } from '@/components/forms';
import React, { FC } from 'react';

import { HowMuchProps } from './types';
import { InputNumber } from '@/components';
import coreStyles from '../index.module.scss';
import styles from './index.module.scss';

const HowMuch: FC<HowMuchProps> = ({
  offer,
  queryOffer,
  onChange,
  onSubmit,
  createTrade: {
    cryptocurrencyAmount,
    fiatAmount,
    willReceiveFiat,
    isTradeAvailability,
  },
}) => {
  return (
    <div className={`${coreStyles.container} ${coreStyles.howMuch}`}>
      <h2 className={coreStyles.heading}>How Much do you want to buy</h2>

      <form onSubmit={onSubmit}>
        <div className={styles.inputContainer}>
          <InputNumber
            id="howMuch"
            onChange={onChange}
            value={fiatAmount}
            width="8rem"
            label="Will Pay"
          />
          <p>
            You will receive{' '}
            <strong>{`${willReceiveFiat} ${offer.fiat?.symbol}`}</strong> in{' '}
            <strong>{offer.cryptocurrency?.name}</strong>
          </p>
        </div>
      </form>
    </div>
  );
};

export default HowMuch;
