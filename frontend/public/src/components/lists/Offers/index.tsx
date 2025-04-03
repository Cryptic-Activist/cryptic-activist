'use client';

import { FC } from 'react';
import Header from './Header';
import List from './List';
import { OffersProps } from './types';
import styles from './index.module.scss';
import { useApp } from '@/hooks';

const Offers: FC<OffersProps> = ({ height }) => {
  const {
    app: { currentPrice, type },
  } = useApp();

  return (
    <div className={styles.container}>
      <Header />
      <List
        currentPrice={currentPrice}
        type={type}
        height={height}
        id="offersListHomePage"
      />
    </div>
  );
};

export default Offers;
