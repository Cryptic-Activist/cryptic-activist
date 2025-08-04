import styles from './index.module.scss';

const SocialProof = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Trusted by the Community</h2>
      <p className={styles.subheading}>
        Real users. Real feedback. Real impact.
      </p>

      <div className={styles.stats}>
        <div className={styles.statBox}>
          <h3 className={styles.statNumber}>10,000+</h3>
          <p>Successful Trades</p>
        </div>
        <div className={styles.statBox}>
          <h3 className={styles.statNumber}>99.8%</h3>
          <p>Dispute Resolution Success</p>
        </div>
        <div className={styles.statBox}>
          <h3 className={styles.statNumber}>4.9/5</h3>
          <p>User Satisfaction Rating</p>
        </div>
      </div>

      <div>
        {/* 
          TODO:
          Implement best vendors algorithm and display the 3 top vendors based on number on trades, trusts, resolved disputes, volume traded etc.
        */}
        <h1>Best Vendors</h1>
      </div>

      <div className={styles.testimonials}>
        <div className={styles.testimonialCard}>
          <p>
            “The escrow system and support team saved me from a scam. I’ve never
            felt safer trading crypto for fiat.”
          </p>
          <span className={styles.author}>— Lisa M., Vendor</span>
        </div>

        <div className={styles.testimonialCard}>
          <p>
            “Easy to use, super clean interface, and love that the community is
            active on Telegram. 5 stars.”
          </p>
          <span className={styles.author}>— Tom A., Trader</span>
        </div>

        <div className={styles.testimonialCard}>
          <p>
            “The fraud detection is solid. I’ve had smoother experiences here
            than on big-name platforms.”
          </p>
          <span className={styles.author}>— Alex D., Buyer</span>
        </div>
      </div>
    </div>
  );
};

export default SocialProof;
