'use client';

import React, { FC } from 'react';
import { filters, icons } from './data';
import { getInitials, getLocaleFullDateString, toUpperCase } from '@/utils';

import Image from 'next/image';
import Link from 'next/link';
import Pagination from '@/components/Pagination';
import { TradeItemProps } from './types';
import styles from './page.module.scss';
import { useTrades } from '@/hooks';
import { validateWithAuthToken } from '@/services/user';
import { withAuth } from '@/hoc/withAuth';

const TradeItem: FC<TradeItemProps> = ({ trade, as }) => {
  const getTrade = () => {
    const filtered = icons.filter((icon) => icon.status === trade.status);
    return filtered.length > 0 ? filtered[0] : null;
  };

  const getUrl = () => {
    let url = '/trade/';
    if (trade.status === 'IN_PROGRESS' || trade.status === 'PENDING') {
      const appendedUrl = as === 'vendor' ? '/vendor' : '';
      url += trade.id + appendedUrl;
    } else {
      url += trade.id + '/details';
    }
    return url;
  };

  const tradeObj = getTrade();

  return (
    <div
      key={trade.id}
      className={styles.card}
      style={{
        borderLeftColor: tradeObj?.backgroundColor,
      }}
    >
      <div className={styles.cardBody}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardHeading}>Trade Summary</h2>
          {trade.status && (
            <span
              className={styles.badge}
              style={{
                backgroundColor: tradeObj?.backgroundColor,
                color: tradeObj?.color,
              }}
            >
              {trade.status}
            </span>
          )}
        </div>
        <div className={styles.cardContent}>
          <section className={styles.tradeSection}>
            <ul>
              <li>
                <strong className={styles.label}>Cryptocurrency:</strong>
                <div className={styles.value}>
                  {`${
                    trade?.cryptocurrencyAmount
                  } ${trade?.cryptocurrency?.symbol.toUpperCase()}`}
                </div>
              </li>
              <li>
                <strong className={styles.label}>FIAT:</strong>
                <div className={styles.value}>
                  {`${trade.fiatAmount} ${trade.fiat?.symbol.toUpperCase()}`}
                </div>
              </li>
              <li>
                <strong className={styles.label}>Exchange Rate:</strong>
                <div className={styles.value}>
                  {trade?.cryptocurrency?.image && (
                    <Image
                      src={trade?.cryptocurrency?.image}
                      alt="crypto icon"
                      width={18}
                      height={18}
                    />
                  )}
                  {`${
                    trade.exchangeRate
                  } ${trade.fiat?.symbol.toUpperCase()} / ${toUpperCase(
                    trade.cryptocurrency?.symbol
                  )}`}
                </div>
              </li>
            </ul>
          </section>
          <section className={styles.tradeSection}>
            <ul>
              <li>
                <strong className={styles.label}>
                  {as === 'trader' ? 'Vendor' : 'Trader'} Name:
                </strong>
                <div className={styles.value}>
                  <div
                    className={styles.initials}
                    style={{
                      backgroundColor:
                        as === 'trader'
                          ? trade.vendor?.profileColor
                          : trade.trader?.profileColor,
                    }}
                  >
                    {as === 'trader'
                      ? getInitials(
                          trade.vendor?.firstName ?? '',
                          trade.vendor?.lastName ?? ''
                        )
                      : getInitials(
                          trade.trader?.firstName ?? '',
                          trade.trader?.lastName ?? ''
                        )}
                  </div>
                  {as === 'trader'
                    ? `${trade.vendor?.firstName} ${trade.vendor?.lastName}`
                    : `${trade.trader?.firstName} ${trade.trader?.lastName}`}
                </div>
              </li>
              <li>
                <strong className={styles.label}>
                  {as === 'trader' ? 'Vendor' : 'Trader'} Username:
                </strong>
                <div className={styles.value}>
                  {as === 'trader'
                    ? trade.vendor?.username
                    : trade.trader?.username}
                </div>
              </li>
              <li>
                <strong className={styles.label}>
                  {as === 'trader' ? 'Vendor' : 'Trader'} Trades:
                </strong>
                <div className={styles.value}>
                  {as === 'trader'
                    ? trade.vendor?._count?.tradeVendor
                    : trade.trader?._count?.tradeTrader}{' '}
                  trades
                </div>
              </li>
            </ul>
          </section>
          <section className={`${styles.tradeSection} ${styles.rightColumn}`}>
            <ul>
              {trade.startedAt && (
                <li>
                  <strong className={styles.label}>Started At:</strong>
                  <div className={styles.value}>
                    {trade.startedAt
                      ? getLocaleFullDateString(new Date(trade?.startedAt))
                      : 'N/A'}
                  </div>
                </li>
              )}
              {trade.expiredAt && (
                <li>
                  <strong className={styles.label}>Expired At:</strong>
                  <div className={styles.value}>
                    {trade.expiredAt
                      ? getLocaleFullDateString(new Date(trade?.expiredAt))
                      : 'N/A'}
                  </div>
                </li>
              )}
              {trade.escrowReleasedAt && (
                <li>
                  <strong className={styles.label}>Escrow Release:</strong>
                  <div className={styles.value}>
                    {trade.escrowReleasedAt
                      ? getLocaleFullDateString(
                          new Date(trade?.escrowReleasedAt)
                        )
                      : 'N/A'}
                  </div>
                </li>
              )}
              {trade.offer?.timeLimit && (
                <li>
                  <strong className={styles.label}>Durantion:</strong>
                  <div className={styles.value}>{`${
                    trade.offer?.timeLimit / 60
                  } minutes`}</div>
                </li>
              )}
            </ul>
            <Link
              href={getUrl()}
              style={{
                backgroundColor: tradeObj?.backgroundColor,
                color: tradeObj?.color,
              }}
              className={styles.actionBtn}
            >
              {tradeObj?.mainActionButtonLabel}
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

const TradesPage = () => {
  const { trades, as, toggleAs, onChangePage } = useTrades();

  return (
    <div className={styles.container}>
      <ul className={styles.filtersList}>
        {filters.map((filter) => {
          const selectedStyle = as === filter.filter ? styles.selected : '';
          return (
            <li key={filter.filter}>
              <button className={selectedStyle} onClick={toggleAs}>
                {filter.label}
              </button>
            </li>
          );
        })}
      </ul>
      {trades?.data?.length > 0 ? (
        <>
          <ul className={styles.list}>
            {trades?.data?.map((trade) => (
              <TradeItem key={trade.id} trade={trade} as={as} />
            ))}
          </ul>
          <Pagination
            currentPage={trades.currentPage}
            totalPages={trades.totalPages}
            onPageChange={onChangePage}
          />
        </>
      ) : (
        <h3>No trades yet</h3>
      )}
    </div>
  );
};

export default withAuth(TradesPage);
