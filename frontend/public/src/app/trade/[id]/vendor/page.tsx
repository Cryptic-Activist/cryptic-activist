'use client';

import React, { useEffect } from 'react';
import { useTrade, useUser } from '@/hooks';

import { Chat } from '@/components';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';

const TradeVendor = () => {
  const { trade } = useTrade();
  const { user, query } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (query.isSuccess && !user.id) {
      router.back();
      return;
    }
    console.log({ userId: user.id, vendorId: trade.vendor?.id });
    if (trade.vendor?.id && user.id && trade.vendor?.id !== user.id) {
      router.back();
    }
  }, [trade.vendor?.id, user.id, query.isSuccess]);

  return (
    <div className={styles.container}>
      <div className={styles.trade}>
        <h1 className={styles.heading}>Negatiation has started</h1>
        <span className={styles.warning}>
          If anyone ask you to trade outside of the Cryptic Activist Catalog
          platform does not accept such request.
        </span>
        <p>{`${trade.trader?.firstName} ${trade.trader?.lastName}`}</p>
      </div>
      <div>
        {trade.id && trade.vendor && trade.trader && (
          <Chat receiver={trade.trader} sender={trade.vendor} trade={trade} />
        )}
      </div>
    </div>
  );
};

export default TradeVendor;
