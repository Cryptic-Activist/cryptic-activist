import styles from './page.module.scss';

export default function Help() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Help Center</h1>
      <section className={styles.section}>
        <h2>Getting Started</h2>
        <p>
          Learn how to create an account, verify your identity, and set up your
          profile to start trading.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Making Your First Trade</h2>
        <p>
          Detailed guidance on listing or accepting trade offers, using our
          secure crypto escrow system, and initiating off-platform fiat
          transfers.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Understanding the Escrow System</h2>
        <p>
          Discover how our escrow mechanism securely holds crypto funds until
          the fiat transfer is confirmed.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Frequently Asked Questions (FAQs)</h2>
        <ul>
          <li>
            <strong>General:</strong> What is [Your Platform Name]? How does our
            trading work?
          </li>
          <li>
            <strong>Account & Security:</strong> How do I reset my password?
            What should I do if I suspect unauthorized activity?
          </li>
          <li>
            <strong>Trading Process:</strong> How do I create a trade listing?
            What happens if a trade dispute arises?
          </li>
          <li>
            <strong>Technical Issues:</strong> Supported browsers, clearing
            cookies/cache, and troubleshooting tips.
          </li>
        </ul>
      </section>
      <section className={styles.section}>
        <h2>Contact Us</h2>
        <p>
          If you can't find the answer you're looking for, please reach out to
          our support team:
        </p>
        <p>
          Email:{' '}
          <a href="mailto:support@yourplatform.com">support@yourplatform.com</a>
        </p>
        <p>Live Chat: Available on the website during business hours.</p>
        <p>
          Community: Join us on <a href="[Discord Link]">Discord</a> or{' '}
          <a href="[Telegram Link]">Telegram</a> for real-time assistance.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Additional Resources</h2>
        <ul>
          <li>
            <a href="#">User Guides & Tutorials</a>
          </li>
          <li>
            <a href="#">Dispute Resolution Process</a>
          </li>
          <li>
            <a href="#">Platform Updates</a>
          </li>
        </ul>
      </section>
    </div>
  );
}
