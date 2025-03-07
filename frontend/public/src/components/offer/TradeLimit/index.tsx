import React, { FC } from 'react';

import InputNumber from '@/components/InputNumber';
import { TradeLimitProps } from './types';
import styles from './index.module.scss';
import { toUpperCase } from '@/utils';

const TradeLimit: FC<TradeLimitProps> = ({
  createOffer,
  inputMaxTradeAmount,
  inputMinTradeAmount,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <InputNumber
          id="minTradeAmount"
          label="Minimum Trade Amount"
          value={0}
          step={100}
          onChange={inputMinTradeAmount}
          min={0}
          width="11rem"
        />
        <InputNumber
          id="maxTradeAmount"
          label="Maximum Trade Amount"
          value={0}
          step={100}
          onChange={inputMaxTradeAmount}
          min={0}
          width="11rem"
        />
      </div>
      <p className={styles.description}>
        Setting these limits will only allow people to start trades with you
        between you minimum and maximum trade amounts.
      </p>
      <p className={styles.description}>
        Once a transaction is initiated, the exact trade equivalent in{' '}
        {toUpperCase(createOffer.cryptocurrency?.symbol ?? '')} will be moved
        into escrow.
      </p>
    </div>
  );
};

export default TradeLimit;
