import { OfferList } from '@/layouts';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Hello World!</h1>
      <OfferList />
    </div>
  );
}
