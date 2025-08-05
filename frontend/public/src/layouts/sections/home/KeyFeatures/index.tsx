import styles from './index.module.scss';

const KeyFeatures = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Key Features & Benefits</h2>
      <p className={styles.subheading}>Why Trade With Us?</p>

      <div className={styles.features}>
        <div className={styles.row}>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Escrow Protection</h3>
            <p>
              We hold crypto securely in escrow during every trade, ensuring peace
              of mind for both buyers and sellers.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>AI-Powered Fraud Detection</h3>
            <p>
              Real-time risk scoring and behavior analysis helps us catch and
              prevent suspicious activity before it becomes a problem.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Secure Chat System</h3>
            <p>
              Communicate safely within the platform—no need to share personal
              contact details with your trading partner.
            </p>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Transparent Fee Structure</h3>
            <p>
              Only pay a small trading fee when a transaction is successfully
              completed. No hidden charges.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Community & Support</h3>
            <p>
              Join a growing community of verified users and get help fast via our
              in-app support and Discord/Telegram groups.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyFeatures;
