'use client';

import React, { FC } from 'react';

import Link from 'next/link';
import { TradeItemProps } from './types';
import styles from './page.module.scss';
import { useTrades } from '@/hooks';

const TradeItem: FC<TradeItemProps> = ({ trade, as }) => {
  const asVendorUrl = as === 'vendor' ? '/vendor' : '';
  const tradeUrl = `/trade/${trade.id}` + asVendorUrl;
  const tradeDetailsUrl = `/trade/${trade.id}/details`;
  const url = trade.status === 'COMPLETED' ? tradeDetailsUrl : tradeUrl;
  return (
    <div key={trade.id} className={styles.card}>
      <div className={styles.cardHeader}>
        <Link href={url} className={styles.tradeId}>
          {trade.id}
        </Link>
        {trade.status && (
          <span
            className={`${styles.badge} ${styles[trade.status?.toLowerCase()]}`}
          >
            {trade.status}
          </span>
        )}
      </div>
      <div className={styles.cardBody}>
        <div className={styles.row}>
          <div className={styles.label}>Cryptocurrency:</div>
          <div className={styles.value}>
            {trade.cryptocurrency?.symbol.toUpperCase()}{' '}
            {trade.cryptocurrencyAmount}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>FIAT:</div>
          <div className={styles.value}>
            {trade.fiat?.symbol} {trade.fiatAmount}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Escrow Release:</div>
          <div className={styles.value}>
            {trade.escrowReleaseDate
              ? new Date(trade.escrowReleaseDate).toLocaleDateString()
              : 'N/A'}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Blockchain Tx:</div>
          <div className={styles.value}>
            {trade.blockchainTransactionHash ? (
              <a
                href={`https://explorer.example.com/tx/${trade.blockchainTransactionHash}`}
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                View
              </a>
            ) : (
              'N/A'
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TradesPage = () => {
  const { trades, as, toggleAs } = useTrades();

  return (
    <div className={styles.container}>
      <ul className={styles.btns}>
        <li>
          <button
            className={`${as === 'vendor' ? styles.selected : ''}`}
            onClick={toggleAs}
          >
            As Vendor
          </button>
        </li>
        <li>
          <button
            className={`${as === 'trader' ? styles.selected : ''}`}
            onClick={toggleAs}
          >
            As Trader
          </button>
        </li>
      </ul>
      {trades?.data?.length > 0 ? (
        <ul className={styles.list}>
          {trades?.data?.map((trade) => (
            <TradeItem key={trade.id} trade={trade} as={as} />
          ))}
        </ul>
      ) : (
        <h3>No trades yet</h3>
      )}
    </div>
  );
};

export default TradesPage;
