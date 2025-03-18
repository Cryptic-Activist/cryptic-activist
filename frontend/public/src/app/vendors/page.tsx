'use client';

import { Offers, SearchOffer } from '@/components';

import styles from './page.module.scss';

const Vendors = () => {
  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <SearchOffer theme="flat" />
      </div>
      <Offers height="85vh" />
    </div>
  );
};

export default Vendors;
