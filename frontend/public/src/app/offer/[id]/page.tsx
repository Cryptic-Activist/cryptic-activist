'use client';

import { HowMuch, ThisOffer, ThisVendor } from '@/layouts/sections/offer/page';
import { useApp, useDynamicTitle, useOffer } from '@/hooks';

import React from 'react';
import { User } from '@/store/user/types';
import styles from './index.module.scss';

const OfferPage = () => {
  const {} = useDynamicTitle('Offer | Cryptic Activist');
  const { offer, queryOffer, handleFiatAmount, createTrade, onSubmit } =
    useOffer();
  const {
    app: { currentPrice },
  } = useApp();

  return (
    <div className={styles.container}>
      <HowMuch
        offer={offer}
        queryOffer={queryOffer}
        onChange={handleFiatAmount}
        createTrade={createTrade}
        onSubmit={onSubmit}
      />
      <ThisOffer offer={offer} currentPrice={currentPrice} />
      <ThisVendor vendor={offer.vendor} queryOffer={queryOffer} />
    </div>
  );
};

export default OfferPage;
