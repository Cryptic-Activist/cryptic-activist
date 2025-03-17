'use client';

import Header from './Header';
import List from './List';
import styles from './index.module.scss';
import { useApp } from '@/hooks';

const Offers = () => {
  const {
    app: { currentPrice, type },
  } = useApp();
  return (
    <div className={styles.container}>
      <Header />
      <List currentPrice={currentPrice} type={type} />
    </div>
  );
};

export default Offers;
