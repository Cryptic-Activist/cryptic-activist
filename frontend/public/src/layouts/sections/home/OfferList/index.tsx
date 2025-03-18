import { Offers as OffersList, SearchOffer } from '@/components';

import styles from './index.module.scss';

const OfferListSection = () => {
  return (
    <section className={styles.offerListSection}>
      <div className={styles.container}>
        <SearchOffer />
        <OffersList height="31.95rem" />
      </div>
    </section>
  );
};

export default OfferListSection;
