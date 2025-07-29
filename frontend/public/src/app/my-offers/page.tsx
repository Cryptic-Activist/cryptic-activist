'use client';

import React, { FC, useEffect } from 'react';
import {
  getLocalStorage,
  setLocalStorage,
  toCapitalize,
  toUpperCase,
} from '@/utils';
import { useApp, useMyOffers, useUser } from '@/hooks';

import { Button } from '@/components';
import Image from 'next/image';
import { MyOfferItemProps } from './types';
import Pagination from '@/components/Pagination';
import { Type } from '@/store/app/types';
import { filters } from './data';
import styles from './page.module.scss';
import { validateWithAuthToken } from '@/services/user';
import { withAuth } from '@/hoc/withAuth';

const MyOfferItem: FC<MyOfferItemProps> = ({ offer, onDeleteOffer }) => {
  return (
    <li className={styles.listItem}>
      <h2 className={styles.title}>{offer.label}</h2>
      <div className={styles.listItemContent}>
        <section className={styles.tradeSection}>
          <ul>
            <li>
              <strong className={styles.label}>Cryptocurrency:</strong>
              <div className={styles.value}>
                {offer?.cryptocurrency?.image && (
                  <Image
                    src={offer?.cryptocurrency?.image}
                    alt="crypto icon"
                    width={18}
                    height={18}
                  />
                )}
                {offer?.cryptocurrency?.name}
              </div>
            </li>
            <li>
              <strong className={styles.label}>Fiat:</strong>
              <div className={styles.value}>{offer.fiat?.name}</div>
            </li>
            <li>
              <strong className={styles.label}>Offer Type:</strong>
              <div className={styles.value}>
                {toCapitalize(offer.offerType)}
              </div>
            </li>
          </ul>
        </section>
        <section className={styles.tradeSection}>
          <ul>
            <li>
              <strong className={styles.label}>Pricing Type:</strong>
              <div className={styles.value}>
                {toCapitalize(offer?.pricingType)}
              </div>
            </li>
            <li>
              <strong className={styles.label}>Mininum Limit:</strong>
              <div className={styles.value}>{`${offer.limitMin} ${toUpperCase(
                offer?.fiat?.symbol
              )}`}</div>
            </li>
            <li>
              <strong className={styles.label}>Maximum Limit:</strong>
              <div className={styles.value}>{`${offer.limitMax} ${toUpperCase(
                offer?.fiat?.symbol
              )}`}</div>
            </li>
          </ul>
        </section>
        <section className={styles.tradeSection}>
          <ul>
            <li>
              <strong className={styles.label}>Payment Method:</strong>
              <div className={styles.value}>{offer?.paymentMethod?.name}</div>
            </li>
            <li>
              <strong className={styles.label}>Payment Details:</strong>
              <div className={styles.paymentDetails}>
                {offer?.paymentDetails?.instructions}
              </div>
            </li>
          </ul>
        </section>
      </div>
      <div className={styles.footer}>
        <div>
          <strong>Instructions</strong>
          <p>{offer?.instructions}</p>
        </div>
        <div>
          <strong>Terms</strong>
          <p>{offer?.terms}</p>
        </div>
      </div>
      <div className={styles.actionBtns}>
        <Button href={`/offer/${offer?.id}/edit`} padding="0.6rem 1.2rem">
          Edit
        </Button>
        <button onClick={() => onDeleteOffer(offer.id)}>DELETE</button>
      </div>
    </li>
  );
};

const MyOffers = () => {
  const { myOffers, mutationDeleteOffer, onChangePage } = useMyOffers();
  const { app, setValue } = useApp();
  const {
    user: { id },
  } = useUser();

  const handleOffersType = (type: Type) => {
    setValue({ type });
    setLocalStorage('MY_OFFERS_TYPE', type);
  };

  const onDeleteOffer = async (offerId: string) => {
    if (id) {
      mutationDeleteOffer.mutate({ userId: id, offerId });
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localStorageType = getLocalStorage(
        'MY_OFFERS_TYPE'
      ) as unknown as Type;
      setValue({ type: localStorageType });
    }
  }, [typeof window]);

  return (
    <div className={styles.container}>
      <ul className={styles.filtersList}>
        {filters.map((filter) => {
          const selectedStyle =
            app.type === filter.filter ? styles.selected : '';
          return (
            <li key={filter.filter}>
              <button
                className={selectedStyle}
                onClick={() => handleOffersType(filter.filter)}
              >
                {filter.label}
              </button>
            </li>
          );
        })}
      </ul>

      {myOffers.data?.length > 0 && (
        <>
          <ul className={styles.list}>
            {myOffers.data?.map((myOffer) => (
              <MyOfferItem
                key={myOffer.id}
                offer={myOffer}
                onDeleteOffer={onDeleteOffer}
              />
            ))}
          </ul>
          <Pagination
            currentPage={myOffers.currentPage}
            totalPages={myOffers.totalPages}
            onPageChange={onChangePage}
          />
        </>
      )}
    </div>
  );
};

export default withAuth(MyOffers);
