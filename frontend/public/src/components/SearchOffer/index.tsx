import { Button, Selector } from '@/components';

import CurrentPrice from '../CurrentPrice';
import { FC } from 'react';
import type { SearchOfferProps } from './types';
import { SelectWithInput } from '@/components';
import TypeSelector from './TypeSelector';
import styles from './index.module.scss';

const SearchOffer: FC<SearchOfferProps> = ({ theme }) => {
  const flatStyle = theme === 'flat' ? styles.flat : '';
  return (
    <div className={`${styles.container} ${flatStyle}`}>
      <TypeSelector />
      <div className={styles.main}>
        <section className={styles.section}>
          <Selector type="cryptocurrency" />
          <CurrentPrice />
        </section>
        {/* <section className={styles.section}>
          <SelectWithInput type="payment-method" />
        </section> */}
        <section className={styles.section}>
          <SelectWithInput type="amount" />
        </section>
        {/* <section className={styles.section}>
          <Button type="button" padding="1rem 1rem" align="left">
            Find Offer
          </Button>
        </section> */}
      </div>
    </div>
  );
};

export default SearchOffer;
