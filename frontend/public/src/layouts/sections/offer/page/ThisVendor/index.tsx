import React, { FC } from 'react';
import { Tier, VendorInfo } from '@/components';

import Link from 'next/link';
import { ThisVendorProps } from './types';
import coreStyles from '../index.module.scss';
import styles from './index.module.scss';

const ThisVendor: FC<ThisVendorProps> = ({ vendor, queryOffer, trades }) => {
  return (
    <div className={`${coreStyles.container} ${coreStyles.vendor}`}>
      <h2 className={coreStyles.heading}>About this vendor</h2>

      {queryOffer.isPending && 'Loading vendor data...'}
      {queryOffer.isSuccess && vendor && (
        <div className={styles.content}>
          <header className={styles.header}>
            <VendorInfo vendor={vendor} size="small" />
            <div className={styles.tier}>
              <Tier tier={vendor.tier} />
            </div>
          </header>
          <section className={styles.languages}>
            <h3 className={styles.subHeading}>Known languages</h3>
            <ul className={styles.languagesList}>
              {vendor.userLanguage?.map((userLanguage: any, index: any) => (
                <li key={index} className={styles.language}>
                  {userLanguage.language.name}
                </li>
              ))}
            </ul>
          </section>
          <section className={styles.counters}>
            <div className={styles.counter}>
              <h4>Blocked by</h4>
              <span>
                <strong>{vendor._count?.blockers}</strong> people
              </span>
            </div>
            <div className={styles.counter}>
              <h4>Trusted by</h4>
              <span>
                <strong>{vendor._count?.trusters}</strong> people
              </span>
            </div>
            <div className={styles.counter}>
              <h4>Feedbacks</h4>
              <span>
                <strong>{vendor._count?.feedbackTrader}</strong>
              </span>
            </div>
            <div className={styles.counter}>
              <h4>Trades</h4>
              <span>
                <strong>{vendor._count?.tradeVendor}</strong>
              </span>
            </div>
          </section>
          <section className={styles.pastFeedbacks}>
            <h3 className={styles.subHeading}>Past feedbacks</h3>
            <ul className={styles.feedbacksList}>
              {trades?.length === 0 && (
                <li className={styles.emptyPastFeedback}>
                  No past feedback yet
                </li>
              )}
              {trades?.map(({ feedback }: any, index: any) => {
                const positiveBadgeStyles =
                  feedback.type === 'POSITIVE' ? styles.positive : '';
                const neutralBadgeStyles =
                  feedback.type === 'NEUTRAL' ? styles.neutral : '';
                const negativeBadgeStyles =
                  feedback.type === 'NEGATIVE' ? styles.negative : '';
                return (
                  <li key={index} className={styles.feedback}>
                    <Link
                      href={`/vendor/${feedback.id}`}
                      className={styles.iconNames}
                    >
                      <div
                        className={styles.icon}
                        style={{
                          backgroundColor: feedback.trader.profileColor,
                        }}
                      />
                      <div className={styles.namesUsername}>
                        <span
                          className={styles.names}
                        >{`${feedback.trader.firstName} ${feedback.trader.lastName}`}</span>
                        <span className={styles.username}>
                          {feedback.trader.username}
                        </span>
                      </div>
                    </Link>
                    <span
                      className={`${styles.badge} ${positiveBadgeStyles} ${neutralBadgeStyles} ${negativeBadgeStyles}`}
                    >
                      {feedback.type}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
};

export default ThisVendor;
