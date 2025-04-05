import styles from './index.module.scss';

const HowItWorks = () => {
  return (
    <div className={styles.container} id="howItWorks">
      <h2 className={styles.heading}>How It Works</h2>
      <p className={styles.subheading}>Simple 3-Step Guide</p>

      <div className={styles.steps}>
        <div className={styles.step}>
          <div className={styles.stepNumber}>1</div>
          <div>
            <h3 className={styles.stepTitle}>Browse & Choose</h3>
            <p>
              Explore listings or post your own trade offer. Filter by currency,
              amount, or payment method to find the best match.
            </p>
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.stepNumber}>2</div>
          <div>
            <h3 className={styles.stepTitle}>Initiate Trade</h3>
            <p>
              Chat securely with your counterparty. Once both parties agree,
              crypto funds are held in escrow by the platform.
            </p>
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.stepNumber}>3</div>
          <div>
            <h3 className={styles.stepTitle}>Confirm & Release</h3>
            <p>
              After confirming the off-platform fiat transfer, the seller
              releases the crypto from escrow—completing the transaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
