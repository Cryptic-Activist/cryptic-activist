import { OffersNew } from '@/components';
import styles from './index.module.scss';

const OfferListSection = () => {
  return (
    <section className={styles.offerListSection}>
      <div className={styles.container}>
        <OffersNew id="home" height="28.5rem" />
      </div>
    </section>
  );
};

export default OfferListSection;
