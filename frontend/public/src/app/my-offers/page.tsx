'use client';

import { FaPen, FaTrash } from 'react-icons/fa6';
import React, { FC } from 'react';
import { useApp, useMyOffers } from '@/hooks';

import Link from 'next/link';
import { MyOfferItemProps } from './types';
import styles from './page.module.scss';

const MyOfferItem: FC<MyOfferItemProps> = ({ offer }) => {
  return (
    <li className={styles.listItem}>
      <div className={styles.listItemHeader}>
        <span className={styles.offerId}>{offer.id}</span>
        <div className={styles.edits}>
          <Link href={`/offer/${offer.id}/edit`}>
            <FaPen size={16} />
          </Link>
          <button>
            <FaTrash size={16} />
          </button>
        </div>
      </div>
      <div className={styles.listItemContent}>
        <h2 className={styles.label}>{offer.label}</h2>
        <section className={styles.infoSection}>
          <span className={styles.info}>
            Cryptocurreny: {offer.cryptocurrency.name}
          </span>
          <span className={styles.info}>Fiat: {offer.fiat.symbol}</span>
          <span className={styles.info}>
            Time Limit: {offer.timeLimit} minutes
          </span>
          <span className={styles.info}>
            Limits: {offer.limitMin} - {offer.limitMax} {offer.fiat.symbol}
          </span>
        </section>
        <span className={styles.info}>Pricing type: {offer.pricingType}</span>
        <p className={styles.info}>Terms: {offer.terms}</p>
        <p className={styles.info}>Instructions: {offer.instructions}</p>
        <ul className={styles.tags}>
          {offer.tags.map((tag: any, index: number) => (
            <li key={index} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

const MyOffers = () => {
  const { myOffers } = useMyOffers();
  const { app, setValue } = useApp();

  const handleOffersType = (type: 'buy' | 'sell') => {
    setValue({ type });
  };

  return (
    <div className={styles.container}>
      <div className={styles.btns}>
        <button
          onClick={() => handleOffersType('buy')}
          className={app.type === 'buy' ? styles.selected : ''}
        >
          Buy
        </button>
        <button
          onClick={() => handleOffersType('sell')}
          className={app.type === 'sell' ? styles.selected : ''}
        >
          Sell
        </button>
      </div>

      <ul className={styles.list}>
        {myOffers.data?.map((myOffer) => (
          <MyOfferItem key={myOffer.id} offer={myOffer} />
        ))}
      </ul>
    </div>
  );
};

export default MyOffers;
