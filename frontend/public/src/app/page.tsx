import { OfferList } from '@/layouts';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <section>
        <div className={styles.hero}>
          <h1>Buy & Sell Crypto for Fiat Securely - No Middlemen, No Hassle</h1>
          <h2>
            Fast, secure, and peer-to-peer Bitcoin and crypto trading via bank
            transfer.
          </h2>
        </div>
        <h1>Hero</h1>
      </section>
      <h1>How it Works (Simple 3-Step Guide)</h1>
      <h1>Key Features & Benefits</h1>
      <OfferList />
      <h1>Social Proof</h1>
      <h1>Security & Compiance Info</h1>
      <h1>Call to Action</h1>
    </div>
  );
}
