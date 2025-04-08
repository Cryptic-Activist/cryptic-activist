'use client';

import { CurrentOffersProps, ItemProps } from './types';
import React, { FC, useEffect, useState } from 'react';
import { useApp, useUser } from '@/hooks';

import Button from '@/components/Button';
import { FaArrowUp } from 'react-icons/fa6';
import Info from '@/components/Info';
import { fetchCurrentVendorOffers } from '@/services/offers';
import styles from './index.module.scss';
import { toCapitalize } from '@/utils';
import { useQuery } from '@tanstack/react-query';

export const Item: FC<ItemProps> = ({ offer, currentPrice, isCurrentUser }) => {
  return (
    <li key={offer.id} className={styles.offerItem}>
      <div className={styles.labelTermsTags}>
        <h4 className={styles.label}>{offer.label}</h4>
        <p className={styles.terms}>{offer.terms}</p>
        <ul className={styles.tags}>
          {offer.tags.map((tag: string, index: number) => (
            <li key={index} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.pricesButtonContainer}>
        <div className={styles.prices}>
          <div className={styles.cryptoPrice}>
            {offer.pricingType === 'fixed' && offer.listAt}
            {offer.pricingType === 'market' && (
              <>
                {currentPrice &&
                  currentPrice > 0 &&
                  (
                    parseFloat((offer.listAt / 100 + 1).toFixed(4)) *
                    currentPrice
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
        <Button href={`/offer/${offer.id}`}>
          {toCapitalize(isCurrentUser ? 'View' : offer.offerType)}
        </Button>
      </div>
    </li>
  );
};

const CurrentOffers: FC<CurrentOffersProps> = ({ vendorId }) => {
  const {
    app: { currentPrice },
  } = useApp();
  const { user } = useUser();
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ['currentOffers'],
    queryFn: async () => {
      const response = await fetchCurrentVendorOffers(vendorId);
      return response;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 3,
    enabled: !!vendorId,
  });

  useEffect(() => {
    if (user?.id) {
      setIsCurrentUser(user.id === vendorId);
    }
  }, [user, vendorId]);

  return (
    <section className={styles.container}>
      <h2>Current Offers</h2>
      {isPending && <p>Loading...</p>}
      {data?.length === 0 && 'No current offers'}
      {data?.length > 0 && (
        <ul className={styles.offersList}>
          {data?.map((offer: any) => (
            <Item
              key={offer.id}
              offer={offer}
              currentPrice={currentPrice}
              isCurrentUser={isCurrentUser}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default CurrentOffers;
