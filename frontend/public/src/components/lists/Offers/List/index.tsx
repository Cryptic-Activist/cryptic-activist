'use client';

import { Button, Info } from '@/components';
import {
  FaArrowRightArrowLeft,
  FaArrowUp,
  FaCircle,
  FaEllipsis,
  FaHeart,
  FaSpinner,
} from 'react-icons/fa6';
import type { ItemProps, ListProps, RatesProps } from './types';
import { getInitials, toCapitalize } from '@/utils';

import { FC } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Link from 'next/link';
import styles from './index.module.scss';
import { useOffers } from '@/hooks';

const Rates: FC<RatesProps> = ({ offer, currentPrice }) => (
  <div className={styles.prices}>
    <div className={styles.cryptoPrice}>
      {offer.pricingType === 'fixed' && offer.listAt}
      {offer.pricingType === 'market' && (
        <>
          {currentPrice &&
            currentPrice > 0 &&
            (
              parseFloat((offer.listAt / 100 + 1).toFixed(4)) * currentPrice
            ).toFixed(2)}
        </>
      )}
      {` ${offer.fiat.symbol}`}
    </div>
    {offer.pricingType === 'market' && (
      <div className={styles.percentage}>
        <FaArrowUp size={18} />
        <span className={styles.percentAmount}>{offer.listAt}</span>
        <Info
          message={`The asking price is ${offer.listAt}% above the market price`}
        />
      </div>
    )}
    <p
      className={styles.limits}
    >{`Limits: ${offer.limitMin} - ${offer.limitMax} ${offer.fiat.symbol}`}</p>
  </div>
);

const Item: FC<ItemProps> = ({ offer, currentPrice, type }) => {
  return (
    <li className={styles.item}>
      <div className={styles.vendor}>
        <div
          className={styles.vendorAvatar}
          style={{ backgroundColor: offer.vendor.profileColor }}
        >
          {getInitials(
            offer?.vendor?.firstName ?? '',
            offer?.vendor?.lastName ?? ''
          )}
        </div>
        <div className={styles.namesCounters}>
          <Link
            className={styles.namesUsernameLink}
            href={`/vendor/${offer.vendor.id}`}
          >
            <span
              className={styles.names}
            >{`${offer.vendor.firstName} ${offer.vendor.lastName}`}</span>
            <span className={styles.vendorUsername}>
              {offer.vendor.username}
            </span>
          </Link>
          <div className={styles.counters}>
            <div className={`${styles.counter} ${styles.trades}`}>
              <FaHeart size={18} />
              <span>{offer._count?.feedbacks}</span>
            </div>
            <div className={styles.counter}>
              <FaArrowRightArrowLeft size={18} />
              <span>{offer._count?.trades}</span>
            </div>
          </div>
          <div className={styles.status}>
            <FaCircle size={10} />
            <span>41 minutes ago</span>
          </div>
        </div>
      </div>
      <div className={styles.labelTermsTags}>
        <h4 className={styles.label}>{offer.label}</h4>
        <p className={styles.terms}>{offer.terms}</p>
        <ul className={styles.tags}>
          {offer.tags.map((tag, index) => (
            <li key={index} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.avgTradeSpeed}>
        <p>Under a minute</p>
      </div>
      <div className={styles.rates}>
        <Rates offer={offer} currentPrice={currentPrice} />
        <Button href={`/offer/${offer.id}`}>{toCapitalize(type)}</Button>
      </div>
    </li>
  );
};

const List: FC<ListProps> = ({ currentPrice, type, height, id }) => {
  const { offers, loadMore, initialFetch } = useOffers();

  return (
    <div
      className={styles.list}
      id={id}
      style={{
        ...(height && { height }),
      }}
    >
      {offers.data && (
        <InfiniteScroll
          className={styles.list}
          dataLength={offers.data?.length}
          hasMore={offers.hasMore}
          next={loadMore}
          loader={
            <div
              className={styles.spinner}
              style={{
                ...(height && { height: `calc(${height} - 1rem)` }),
              }}
            >
              <FaSpinner size={20} />
            </div>
          }
          endMessage={
            <div className={styles.endOfList}>
              <FaEllipsis size={20} />
            </div>
          }
          scrollableTarget={id}
          refreshFunction={initialFetch}
          pullDownToRefresh
          pullDownToRefreshThreshold={80}
          pullDownToRefreshContent={
            <h3 className={styles.pullDownToRefresh}>
              &#8595; Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 className={styles.releaseToRefresh}>
              &#8593; Release to refresh
            </h3>
          }
        >
          {offers.data?.map((offer, index) => (
            <Item
              key={index}
              offer={offer}
              currentPrice={currentPrice}
              type={type}
            />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default List;
