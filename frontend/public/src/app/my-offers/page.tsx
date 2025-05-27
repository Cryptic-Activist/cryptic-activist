'use client';

import React, { FC } from 'react';
import { useApp, useMyOffers, useUser } from '@/hooks';

import Link from 'next/link';
import { MyOfferItemProps } from './types';
import styles from './page.module.scss';

const MyOfferItem: FC<MyOfferItemProps> = ({ offer, onDeleteOffer }) => {
  return (
    <li className={styles.listItem}>
      <div className={styles.listItemHeader}>
        <Link href={`/offer/${offer.id}`} className={styles.offerId}>
          {offer.id}
        </Link>
        <div className={styles.listItemHeaderActions}>
          <div className={styles.edit}>
            <Link href={`/offer/${offer.id}/edit`}>EDIT</Link>
          </div>
          <div className={styles.delete}>
            <button onClick={() => onDeleteOffer(offer.id)}>DELETE</button>
          </div>
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
  const { myOffers, deleteOffer } = useMyOffers();
  const { app, setValue } = useApp();
  const {
    user: { id },
  } = useUser();

  const handleOffersType = (type: 'buy' | 'sell') => {
    setValue({ type });
  };

  const onDeleteOffer = async (offerId: string) => {
    if (id) {
      const deleted = await deleteOffer({ userId: id, offerId });
      return deleted;
    }
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
          <MyOfferItem
            key={myOffer.id}
            offer={myOffer}
            onDeleteOffer={onDeleteOffer}
          />
        ))}
      </ul>
    </div>
  );
};

export default MyOffers;
