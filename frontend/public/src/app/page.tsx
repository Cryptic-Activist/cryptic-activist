import { OfferList } from '@/layouts';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Deployed via Github Actions</h1>
      <OfferList />
    </div>
  );
}
