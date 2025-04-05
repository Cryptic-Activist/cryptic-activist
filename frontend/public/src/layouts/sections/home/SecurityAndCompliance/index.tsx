import styles from './index.module.scss';

const SecurityCompliance = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>Security & Compliance</h2>
      <p className={styles.subheading}>
        Your safety is our top priority. We&apos;ve implemented industry-leading
        measures to protect your assets and data.
      </p>

      <div className={styles.features}>
        <div className={styles.featureBox}>
          <h3>End-to-End Encryption</h3>
          <p>
            Your messages and transactions are encrypted for maximum privacy and
            protection.
          </p>
        </div>
        <div className={styles.featureBox}>
          <h3>Escrow-Based Transactions</h3>
          <p>
            Crypto is only released when both parties confirm the fiat transfer
            is completed.
          </p>
        </div>
        <div className={styles.featureBox}>
          <h3>AI Fraud Detection</h3>
          <p>
            Real-time monitoring powered by machine learning to spot and prevent
            suspicious activity.
          </p>
        </div>
        <div className={styles.featureBox}>
          <h3>Optional KYC Verification</h3>
          <p>
            Vendors can build extra trust with verified identities, while users
            retain privacy control.
          </p>
        </div>
        <div className={styles.featureBox}>
          <h3>Compliant by Design</h3>
          <p>
            Our policies align with data protection standards like GDPR, giving
            you peace of mind.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SecurityCompliance;
