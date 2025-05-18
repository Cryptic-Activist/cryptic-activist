'use client';

import React from 'react';
import styles from './index.module.scss';
import { useUser } from '@/hooks';

export default function RewardsPage() {
  const { user } = useUser();

  return (
    <div className={styles.rewardsPage}>
      <h1 className={styles.rewardTitle}>Your Referral Rewards</h1>

      <p className={styles.referralCode}>
        Your referral code: <span>{user.referralCode}</span>
      </p>

      <br />

      <div className={styles.rewardInfo}>
        <h2>How It Works</h2>
        <p>
          Share your unique referral code with friends. When they sign up and
          complete their first trade, you earn rewards credited to your account.
        </p>
        <ul>
          <li>
            <strong>Referral Code:</strong> Visible on your profile page.
          </li>
          <li>
            <strong>Earning:</strong> You receive <code>10 USD</code> equivalent
            in crypto per successful referral.
          </li>
          <li>
            <strong>Payout:</strong> Rewards are automatically credited once the
            referee completes a trade.
          </li>
          <li>
            <strong>Limits:</strong> No limit on number of referrals!
          </li>
        </ul>
      </div>
    </div>
  );
}
