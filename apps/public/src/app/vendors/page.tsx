'use client';

import { Offers, SearchOffer } from '@/components';

import styles from './page.module.scss';

export default function Vendors() {
  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <SearchOffer theme="flat" />
      </div>
      <Offers height="85vh" />
    </div>
  );
}
