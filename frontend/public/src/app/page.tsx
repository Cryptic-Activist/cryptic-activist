import { OfferList } from '@/layouts';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Deployed via Github Actions</h1>
      <h2>April 2025</h2>
      <h3>I love you</h3>
      <OfferList />
    </div>
  );
}
