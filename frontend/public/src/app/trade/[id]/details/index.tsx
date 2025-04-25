'use client';

import React, { FC } from 'react';

import Image from 'next/image';
import { TradeDetailsProps } from './types';
import styles from './page.module.scss';
import { toUpperCase } from '@/utils';

const TradeDetailsPage: FC<TradeDetailsProps> = ({ trade, app }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h1 className={styles.cardTitle}>Trade Details</h1>
          <span className={`${styles.badge} ${styles.badgeSuccess}`}>
            {trade.status}
          </span>
        </div>

        <div className={styles.tradeInfo}>
          <div>
            <div className={styles.infoGroup}>
              <div className={styles.infoLabel}>Transaction ID</div>
              <div className={styles.infoValue}>{trade.id}</div>
            </div>

            <div className={styles.infoGroup}>
              <div className={styles.infoLabel}>Cryptocurrency</div>
              <div
                className={`${styles.infoValue} ${styles.large} ${styles.infoValueCrypto}`}
              >
                {trade.cryptocurrency?.image && (
                  <Image
                    src={trade.cryptocurrency?.image}
                    alt={trade.cryptocurrency?.name}
                    style={{ verticalAlign: 'middle', marginRight: '4px' }}
                    width={30}
                    height={30}
                  />
                )}
                <span>
                  {`${trade.cryptocurrencyAmount} ${toUpperCase(
                    trade.cryptocurrency?.symbol
                  )}`}
                </span>
              </div>
            </div>

            <div className={styles.infoGroup}>
              <div className={styles.infoLabel}>Fiat Amount</div>
              <div className={`${styles.infoValue} ${styles.large}`}>
                {trade.fiatAmount} {toUpperCase(trade.fiat?.symbol)}
              </div>
            </div>

            <div className={styles.infoGroup}>
              <div className={styles.infoLabel}>Exchange Rate</div>
              <div className={styles.infoValue}>
                {`1 ${toUpperCase(trade.cryptocurrency?.symbol)} = ${
                  app.currentPrice
                } ${toUpperCase(trade.fiat?.symbol)}`}
                <span className={styles.priceIndicator}>+2.35%</span>
              </div>
            </div>
          </div>

          <div>
            <div className={styles.infoGroup}>
              <div className={styles.infoLabel}>Trade Started</div>
              <div className={styles.infoValue}>April 25, 2025 - 14:32 UTC</div>
            </div>

            <div className={styles.infoGroup}>
              <div className={styles.infoLabel}>Trade Completed</div>
              <div className={styles.infoValue}>April 25, 2025 - 14:58 UTC</div>
            </div>

            <div className={styles.infoGroup}>
              <div className={styles.infoLabel}>Trade Speed</div>
              <div className={styles.infoValue}>26 minutes</div>
            </div>

            <div className={styles.infoGroup}>
              <div className={styles.infoLabel}>Transaction Hash</div>
              <div
                className={styles.infoValue}
                style={{
                  fontFamily: 'monospace',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                0x7a69c2d3f54c8e5c8618d856b0237bdf53c39c32ae57deefed28c...
              </div>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.userInfo}>
          <div className={styles.avatar} style={{ backgroundColor: '#9c27b0' }}>
            CM
          </div>
          <div className={styles.userDetails}>
            <div className={styles.username}>Compatible Malay (Vendor)</div>
            <div className={styles.userStats}>
              <div className={styles.stat}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                0 positive
              </div>
              <div className={styles.stat}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                3 trades
              </div>
            </div>
          </div>
        </div>

        <div className={styles.userInfo}>
          <div className={styles.avatar} style={{ backgroundColor: '#2196f3' }}>
            YU
          </div>
          <div className={styles.userDetails}>
            <div className={styles.username}>Your Username (Trader)</div>
            <div className={styles.userStats}>
              <div className={styles.stat}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                2 positive
              </div>
              <div className={styles.stat}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                8 trades
              </div>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <h3 className={styles.sectionTitle}>Payment Details</h3>
        <div className={styles.paymentDetails}>
          <div className={styles.infoGroup}>
            <div className={styles.infoLabel}>Payment Method</div>
            <div className={styles.infoValue}>SEPA Bank Transfer</div>
          </div>

          <div className={styles.infoGroup}>
            <div className={styles.infoLabel}>Payment Instructions</div>
            <div className={styles.infoValue}>
              Please make the payment to the following bank account:
              <br />
              IBAN: DE89 3704 0044 0532 0130 00
              <br />
              BIC: COBADEFFXXX
              <br />
              Account Holder: Compatible Malay
              <br />
              Reference: TRD-97854632
            </div>
          </div>

          <div className={styles.infoGroup}>
            <div className={styles.infoLabel}>Payment Receipt</div>
            <div className={styles.infoValue}>
              <a href="#" className={styles.link}>
                View Receipt
              </a>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <h3 className={styles.sectionTitle}>Trade Progress</h3>
        <div className={styles.tradeProgress}>
          <div className={styles.milestone}>
            <div className={styles.milestoneIcon}>✓</div>
            <div className={styles.milestoneText}>
              Trade initiated - April 25, 2025 14:32 UTC
            </div>
          </div>

          <div className={styles.milestone}>
            <div className={styles.milestoneIcon}>✓</div>
            <div className={styles.milestoneText}>
              ETH locked in escrow - April 25, 2025 14:33 UTC
            </div>
          </div>

          <div className={styles.milestone}>
            <div className={styles.milestoneIcon}>✓</div>
            <div className={styles.milestoneText}>
              Payment sent via SEPA - April 25, 2025 14:40 UTC
            </div>
          </div>

          <div className={styles.milestone}>
            <div className={styles.milestoneIcon}>✓</div>
            <div className={styles.milestoneText}>
              Payment confirmed by vendor - April 25, 2025 14:56 UTC
            </div>
          </div>

          <div className={styles.milestone}>
            <div className={styles.milestoneIcon}>✓</div>
            <div className={styles.milestoneText}>
              ETH released from escrow - April 25, 2025 14:57 UTC
            </div>
          </div>

          <div className={styles.milestone}>
            <div className={styles.milestoneIcon}>✓</div>
            <div className={styles.milestoneText}>
              Trade completed successfully - April 25, 2025 14:58 UTC
            </div>
          </div>
        </div>

        <div className={styles.chatSection}>
          <h3 className={styles.sectionTitle}>Trade Chat</h3>
          <button
            className={`${styles.btn} ${styles.btnOutline}`}
            style={{ width: '100%' }}
          >
            View Chat History
          </button>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.actionButtons}>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>
            Leave Feedback
          </button>
          <button className={`${styles.btn} ${styles.btnOutline}`}>
            Report an Issue
          </button>
          <button className={`${styles.btn} ${styles.btnOutline}`}>
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradeDetailsPage;
