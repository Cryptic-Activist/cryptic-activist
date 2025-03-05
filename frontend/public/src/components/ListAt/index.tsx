import React, { FC } from 'react';
import { useApp, useCreateOffer } from '@/hooks';

import { ListAtProps } from './types';
import { MinusPlusInput } from '@/components';
import styles from './index.module.scss';

const ListAt: FC<ListAtProps> = ({ onChange }) => {
  const {
    app: { currentPrice, defaults },
  } = useApp();
  const { createOffer } = useCreateOffer();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.pricingTypeRow}>
          {createOffer.data?.tradePricingType === 'fixed' && (
            <MinusPlusInput
              value={currentPrice ?? 0}
              step={100}
              onChange={onChange}
              symbol={createOffer.data?.fiat?.symbol}
              min={0}
            />
          )}
          {createOffer.data?.tradePricingType === 'market' && (
            <MinusPlusInput
              value={createOffer.data?.listAt ?? 0}
              step={0.1}
              onChange={onChange}
              symbol="%"
              min={0}
            />
          )}
          <span className={styles.onEachStatement}>on each sale</span>
        </div>
        <p className={styles.statement}>
          {`Current ${createOffer.data?.cryptocurrency?.name} market price: `}
          <strong>
            {currentPrice
              ? `${currentPrice} ${defaults.fiat?.symbol}`
              : 'Unavailable'}
          </strong>
        </p>
      </div>
    </>
  );
};

export default ListAt;
