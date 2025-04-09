import styles from './page.module.scss';

const TierSystemPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Tier System & Trading Fee Discounts</h1>
      <p className={styles.intro}>
        Our tier system is designed to reward you for your continued trading on
        our platform. As you trade, you earn XP that helps you progress to
        higher tiers. Each new tier unlocks greater discounts on trading fees,
        incentivizing you to make future trades and enjoy a more cost-effective
        trading experience.
      </p>

      <section className={styles.section}>
        <h2 className={styles.subheading}>How It Works</h2>
        <p>
          Every trade you make earns you experience points (XP). Accumulate
          enough XP, and you&apos;ll be promoted to the next tier. With each new
          tier, you&apos;ll receive increased discounts on trading fees:
        </p>
        <ol className={styles.stepsList}>
          <li>
            <strong>Bronze:</strong> Your starting tier. Earn XP by trading to
            unlock discounts.
          </li>
          <li>
            <strong>Silver:</strong> Reach <em>1,000 XP</em> to move to Silver
            and enjoy a small discount.
          </li>
          <li>
            <strong>Gold:</strong> When you accumulate <em>5,000 XP</em>, you
            qualify for Gold discounts.
          </li>
          <li>
            <strong>Platinum:</strong> Achieve <em>10,000 XP</em> to join our
            exclusive Platinum tier.
          </li>
          <li>
            <strong>Diamond:</strong> Once you hit <em>20,000 XP</em>, you
            become a Diamond member and get the highest fee discounts.
          </li>
        </ol>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheading}>Tier Benefits Overview</h2>
        <table className={styles.tierTable}>
          <thead>
            <tr>
              <th>Tier</th>
              <th>Discount on Trading Fees</th>
              <th>Required XP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bronze</td>
              <td>0% (Base Rate)</td>
              <td>0 XP</td>
            </tr>
            <tr>
              <td>Silver</td>
              <td>5% Discount</td>
              <td>1,000 XP</td>
            </tr>
            <tr>
              <td>Gold</td>
              <td>10% Discount</td>
              <td>5,000 XP</td>
            </tr>
            <tr>
              <td>Platinum</td>
              <td>15% Discount</td>
              <td>10,000 XP</td>
            </tr>
            <tr>
              <td>Diamond</td>
              <td>20% Discount</td>
              <td>20,000 XP</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheading}>Why Participate?</h2>
        <p>
          Upgrading your tier not only reduces your trading fees but also helps
          build your reputation in the community. With higher tiers, enjoy
          additional platform perks and priority support. The more you trade,
          the more you save and the higher you climb!
        </p>
      </section>
    </div>
  );
};

export default TierSystemPage;
