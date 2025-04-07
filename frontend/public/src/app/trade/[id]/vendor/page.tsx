'use client';

import { Chat } from '@/components';
import React from 'react';
import styles from './index.module.scss';
import { useTrade } from '@/hooks';

const TradeVendor = () => {
  const { trade } = useTrade();

  return (
    <div className={styles.container}>
      {trade.id && trade.vendor && trade.trader && (
        <Chat receiver={trade.trader} sender={trade.vendor} trade={trade} />
      )}
    </div>
  );
};

export default TradeVendor;
