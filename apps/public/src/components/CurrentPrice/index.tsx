'use client';

import { useApp } from '@/hooks';

import { toUpperCase } from '@/utils';
import styles from './index.module.scss';

const CurrentPrice = () => {
  const {
    app: { currentPrice, defaults },
  } = useApp();

  return (
    <>
      {currentPrice &&
      defaults.cryptocurrency?.symbol &&
      defaults.fiat?.symbol ? (
        <p className={styles.statement}>{`1 ${toUpperCase(
          defaults.cryptocurrency?.symbol
        )} = ${currentPrice} ${defaults.fiat?.symbol}`}</p>
      ) : (
        <p className={styles.statement}>No Data</p>
      )}
    </>
  );
};

export default CurrentPrice;
