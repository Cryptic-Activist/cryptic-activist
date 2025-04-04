import { APP_NAME } from '@/constants';
import styles from './page.module.scss';

export default function AboutUs() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>About Us</h1>
      <section className={styles.section}>
        <p>
          Welcome to <strong>{APP_NAME}</strong>. At <strong>{APP_NAME}</strong>
          , we empower individuals to trade cryptocurrencies directly for fiat
          money in a secure, efficient, and user-friendly environment. Our
          mission is to bridge the gap between the digital and traditional
          financial worlds by facilitating trust-based, peer-to-peer
          transactions.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Our Story</h2>
        <p>
          Founded by a team passionate about both technology and finance, we
          recognized the need for a platform that puts users in control of their
          crypto trades without intermediaries complicating the process.
          Inspired by the success of P2P models like LocalBitcoins, we set out
          to create a platform that combines robust security, a seamless user
          experience, and a vibrant community.
        </p>
      </section>
      <section className={styles.section}>
        <h2>What We Offer</h2>
        <ul>
          <li>
            <strong>Secure Trading:</strong> Our escrow system ensures that
            cryptocurrency is safely held until both parties confirm the fiat
            transfer.
          </li>
          <li>
            <strong>Direct Peer-to-Peer Interaction:</strong> Trade directly
            with other users using our integrated chat system.
          </li>
          <li>
            <strong>Advanced Fraud Protection:</strong> Utilizing AI-driven risk
            scoring and real-time monitoring, we work tirelessly to protect our
            community.
          </li>
          <li>
            <strong>Transparent Fees:</strong> We offer competitive fees that
            are deducted only when a trade is successfully completed.
          </li>
        </ul>
      </section>
      <section className={styles.section}>
        <h2>Our Vision</h2>
        <p>
          We envision a future where digital and fiat currencies coexist
          seamlessly, empowering people worldwide to transact freely and
          securely. Our platform is built on the principles of transparency,
          security, and community trust.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Join Our Community</h2>
        <p>
          We believe that our success lies in the strength of our community.
          Connect with us on <a href="[Discord Link]">Discord</a>,{' '}
          <a href="[Telegram Link]">Telegram</a>, and{' '}
          <a href="[Twitter Link]">Twitter</a> to share insights, get support,
          and be the first to know about new features and updates.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Our Commitment</h2>
        <p>
          At <strong>{APP_NAME}</strong>, your security and satisfaction are our
          top priorities. We are dedicated to continuous innovation and
          improvement, ensuring that your trading experience is not only
          efficient but also safe.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Get in Touch</h2>
        <p>
          Have questions, suggestions, or need assistance? Our support team is
          here to help. Contact us at{' '}
          <a href="mailto:[Your Support Email]">[Your Support Email]</a> or join
          our community channels for real-time assistance.
        </p>
      </section>
    </div>
  );
}
