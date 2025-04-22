'use client';

import React from 'react';
import styles from './index.module.scss';
import { useTrade } from '@/hooks';

const TradeDetailsPage = () => {
  const { trade } = useTrade();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h1 className={styles.title}>Trade Details</h1>
          <span
            className={`${styles.badge} ${
              trade && trade?.status?.toString() === 'COMPLETED'
                ? styles.badgeSuccess
                : styles.badgeDefault
            }`}
          >
            {trade.status}
          </span>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.headerRow}>
            <div>
              <h2 className={styles.tradeId}>ID: {trade.id}</h2>
            </div>
            <div className={styles.actions}>
              <button className={styles.button}>View Chat</button>
              <button className={styles.buttonGhost}>Download Receipt</button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.subtitle}>Summary</h2>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.section}>
              <div className={styles.party}>
                <img
                  src={trade.vendor?.profileImage}
                  alt="Vendor"
                  className={styles.avatar}
                />
                <span>Vendor: {trade.vendor?.username}</span>
              </div>
              <div className={styles.party}>
                <img
                  src={trade.trader?.profileImage}
                  alt="Trader"
                  className={styles.avatar}
                />
                <span>Trader: {trade.trader?.username}</span>
              </div>
            </div>
            <div className={styles.section}>
              <p>
                <strong>Crypto:</strong> {trade.cryptocurrencyAmount}{' '}
                {trade.offer?.cryptocurrency?.symbol}
              </p>
              <p>
                <strong>Fiat:</strong> {trade.fiatAmount}{' '}
                {trade.offer?.fiat?.symbol}
              </p>
              {/* {fees && (
                <p>
                  <strong>Fees:</strong> {trade.fefees.toFixed(2)} {fiat.symbol}
                </p>
              )} */}
            </div>
            <div className={styles.section}>
              <p>
                <strong>Started:</strong>{' '}
                {new Date(trade.startedAt).toLocaleString()}
              </p>
              <p>
                <strong>Ended:</strong>{' '}
                {trade.endedAt ? new Date(trade.endedAt).toLocaleString() : '-'}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.subtitle}>Payment Details</h2>
          </div>
          <div className={styles.cardBody}>
            <p>
              <strong>Method:</strong> {trade.paymentMethod?.name}
            </p>
            {trade.paymentReceipt ? (
              <p>
                <strong>Receipt:</strong>{' '}
                <a
                  href={trade.paymentReceipt.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.link}
                >
                  {trade.paymentReceipt.name}
                </a>
              </p>
            ) : (
              <p>No receipt available</p>
            )}
            {trade.blockchainTransactionHash && (
              <p>
                <strong>Tx:</strong>{' '}
                <a
                  href={`https://explorer.example.com/tx/${trade?.blockchainTransactionHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.link}
                >
                  {trade?.blockchainTransactionHash}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>

      {trade.chat && (
        <></>
        // <div className={styles.card}>
        //   <div className={styles.cardHeader}>
        //     <h2 className={styles.subtitle}>Chat Transcript</h2>
        //   </div>
        //   <div className={styles.cardBody}>
        //     {/* Chat component insertion point */}
        //   </div>
        // </div>
      )}

      <div className={styles.footerActions}>
        <button className={styles.buttonPrimary}>Leave Feedback</button>
        <button className={styles.buttonOutline}>New Trade</button>
      </div>
    </div>
  );
};

export default TradeDetailsPage;
