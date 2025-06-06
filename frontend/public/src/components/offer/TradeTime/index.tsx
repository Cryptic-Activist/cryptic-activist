import React, { FC } from 'react';

import { InputNumber } from '@/components';
import { TradeTimeProps } from './types';
import styles from './index.module.scss';

const TradeTime: FC<TradeTimeProps> = ({
  createOffer,
  inputTradeTimeLimit,
}) => {
  return (
    <div className={styles.container}>
      <InputNumber
        id="tradeTimeLimit"
        label="Trade Time Limit"
        value={createOffer.timeLimit ?? 15}
        step={100}
        onChange={inputTradeTimeLimit}
        min={0}
        width="6rem"
      />
      <p className={styles.description}>
        This indicates the amount of time your trade partner has to make their
        payment. The trade will automatically be canceled if the buyers has not
        clicked “Paid” before the payment window expires.
      </p>
    </div>
  );
};

export default TradeTime;
