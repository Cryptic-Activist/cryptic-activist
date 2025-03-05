import { Hero, OfferList } from '@/layouts';

import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <OfferList />
    </div>
  );
}
