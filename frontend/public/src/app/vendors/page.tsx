'use client';

import { OffersNew } from '@/components';
import styles from './page.module.scss';

export default function Vendors() {
  return (
    <div className={styles.container}>
      <OffersNew id="vendors" height="35rem" />
    </div>
  );
}
