import styles from './page.module.scss';

export default function PrivacyPolicy() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Privacy Policy</h1>
      <section className={styles.section}>
        <h2>Introduction</h2>
        <p>
          We are committed to protecting your privacy and personal data. This
          policy explains how we collect, use, store, and share your information
          when you use our P2P crypto-to-fiat trading platform.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Data We Collect</h2>
        <ul>
          <li>
            <strong>Personal Information:</strong> Name, email, phone number,
            and KYC details (if provided).
          </li>
          <li>
            <strong>Transaction Data:</strong> Trade history, chat logs, IP
            addresses, and behavioral data for fraud detection.
          </li>
          <li>
            <strong>Usage Data:</strong> Browser type, pages visited, and other
            metadata via cookies and analytics.
          </li>
        </ul>
      </section>
      <section className={styles.section}>
        <h2>How We Use Your Data</h2>
        <ul>
          <li>
            <strong>Service Delivery:</strong> To manage your account, process
            trades, and resolve disputes.
          </li>
          <li>
            <strong>Security & Fraud Prevention:</strong> Utilize data in AI
            risk scoring and fraud detection systems.
          </li>
          <li>
            <strong>Communication:</strong> Send notifications, updates, and
            support messages.
          </li>
          <li>
            <strong>Analytics:</strong> Improve our services based on your usage
            patterns.
          </li>
        </ul>
      </section>
      <section className={styles.section}>
        <h2>Data Sharing & Third Parties</h2>
        <ul>
          <li>
            <strong>Service Providers:</strong> Limited data may be shared with
            hosting, payment processing, or security partners under strict
            confidentiality.
          </li>
          <li>
            <strong>Legal Requirements:</strong> We may disclose data if legally
            required.
          </li>
          <li>
            <strong>No Data Sale:</strong> We do not sell your personal data.
          </li>
        </ul>
      </section>
      <section className={styles.section}>
        <h2>User Rights</h2>
        <p>
          You have the right to access, correct, or request deletion of your
          data. Contact us to exercise these rights.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Data Security & Retention</h2>
        <p>
          We use encryption, secure servers, and regular audits to protect your
          data. Data is retained only as long as necessary to meet business and
          legal obligations.
        </p>
      </section>
      <section className={styles.section}>
        <h2>International Data Transfers</h2>
        <p>
          If data is transferred internationally, appropriate safeguards are
          implemented to protect your privacy.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Contact & Updates</h2>
        <p>
          For privacy inquiries, please contact us. This policy may be updated
          periodically.
        </p>
      </section>
    </div>
  );
}
