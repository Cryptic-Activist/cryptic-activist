'use client';

import { FaCheck, FaClone } from 'react-icons/fa6';
import React, { useEffect, useState } from 'react';

import { APP_URL } from '@/constants';
import { formatNumber } from '@/utils';
import { getNextTier } from '@/services/tiers';
import styles from './index.module.scss';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@/hooks';
import { validateWithAuthToken } from '@/services/user';
import { withAuthAdvanced } from '@/hoc/withAuth';

function RewardsPage() {
  const { user } = useUser();
  const [wasCopied, setWasCopied] = useState(false);
  const sharableLink = `${APP_URL}?referral=${user.referralCode}`;
  const [progress, setProgress] = useState(0);

  const { data } = useQuery({
    queryKey: ['user', user.id],
    queryFn: async () => {
      if (user.id) {
        const nextTier = await getNextTier(user.id);
        return nextTier;
      }
    },
    enabled: !!user.id,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sharableLink);
    setWasCopied(true);
    setTimeout(() => {
      setWasCopied(false);
    }, 2000);
  };

  const calculateProgress = () => {
    if (user.xp && data?.requiredXP) {
      const progress = (user.xp / data?.requiredXP) * 100;
      return Math.min(progress, 100);
    }
    return 0;
  };

  useEffect(() => {
    const calculatedProgress = calculateProgress();
    setProgress(calculatedProgress);
  }, [user.xp, data?.requiredXP]);

  return (
    <div className={styles.container}>
      <h1 className={styles.rewardTitle}>Your Referral Rewards</h1>

      <p className={styles.referralCode}>
        Your referral code: <span>{user.referralCode}</span>
      </p>

      <div className={styles.copyLinkContainer}>
        <h2>Share this link</h2>
        <button onClick={copyToClipboard}>
          <span>{sharableLink}</span>
          {wasCopied ? <FaCheck className={styles.copiedCheck} /> : <FaClone />}
        </button>
      </div>

      <div className={styles.xpProgress}>
        <div className={styles.xpProgressHeaders}>
          <div className={styles.tier}>
            <span>{user.tier?.name}</span>
            <strong>
              {user.tier?.requiredXP !== undefined
                ? formatNumber(user.tier?.requiredXP)
                : ''}{' '}
              XP
            </strong>
          </div>
          <h2>{`Progress: ${user.xp} XP`}</h2>
          <div className={`${styles.tier} ${styles.nextTier}`}>
            <span>{data?.name}</span>
            <strong>
              {data?.requiredXP !== undefined
                ? formatNumber(data?.requiredXP)
                : ''}{' '}
              XP
            </strong>
          </div>
        </div>
        <div className={styles.xpProgressBar}>
          <div
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

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
            <strong>Earning:</strong> You receive <strong>50xp</strong> per
            successful referral and <strong>100xp</strong> for each trade you
            make.
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

export default withAuthAdvanced(RewardsPage, {
  validateToken: validateWithAuthToken,
});
