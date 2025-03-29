import React, { FC } from 'react';

import { InputNumber } from '@/components';
import { ListAtProps } from './types';
import styles from './index.module.scss';
import { useApp } from '@/hooks';

const ListAt: FC<ListAtProps> = ({ onChange, createOffer }) => {
  const {
    app: { currentPrice, defaults },
  } = useApp();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.pricingTypeRow}>
          {createOffer?.pricingType === 'fixed' && (
            <InputNumber
              id="offerFixPrice"
              value={currentPrice ?? 0}
              step={100}
              onChange={onChange}
              symbol={createOffer?.fiat?.symbol}
              min={0}
            />
          )}
          {createOffer?.pricingType === 'market' && (
            <InputNumber
              id="offerMarketPrice"
              value={createOffer?.listAt ?? 2.35}
              step={0.1}
              onChange={onChange}
              symbol="%"
              min={0}
            />
          )}
          <span className={styles.onEachStatement}>on each sale</span>
        </div>
        <p className={styles.statement}>
          {`Current ${createOffer?.cryptocurrency?.name} market price: `}
          <strong>
            {currentPrice
              ? `${currentPrice} ${defaults?.fiat?.symbol}`
              : 'Unavailable'}
          </strong>
        </p>
      </div>
    </>
  );
};

export default ListAt;
