'use client';

import { formatNumber } from '@/utils';
import styles from './page.module.scss';
import { useTiers } from '@/hooks';

const TierSystemPage = () => {
  const { tiers } = useTiers(false);

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
          {tiers.data?.map((tier: any) => (
            <li key={tier.id}>
              <strong>{tier.name}:</strong> {tier.description}
            </li>
          ))}
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
            {tiers.data?.map((tier: any, index: number) => {
              const discountPercent = parseInt(
                (tier.discount * 100).toString()
              );
              return (
                <tr key={tier.id}>
                  <td>{tier.name}</td>
                  <td>
                    {index === 0
                      ? `${discountPercent}% (Base Rate)`
                      : `${discountPercent}% Discount`}
                  </td>
                  <td>{formatNumber(tier.requiredXP)} XP</td>
                </tr>
              );
            })}
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
