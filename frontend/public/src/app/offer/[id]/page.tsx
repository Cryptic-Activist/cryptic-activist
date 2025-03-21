'use client';

import { HowMuch, ThisOffer, ThisVendor } from '@/layouts/sections/offer/page';
import { useDynamicTitle, useOffer } from '@/hooks';

import React from 'react';
import { User } from '@/store/user/types';
import styles from './index.module.scss';

const OfferPage = () => {
  const {} = useDynamicTitle('Offer | Cryptic Activist');
  const { offer, queryOffer, handleFiatAmount, createTrade, onSubmit } =
    useOffer();

  return (
    <div className={styles.container}>
      <HowMuch
        offer={offer}
        queryOffer={queryOffer}
        onChange={handleFiatAmount}
        createTrade={createTrade}
        onSubmit={onSubmit}
      />
      <ThisOffer offer={offer} />
      <ThisVendor vendor={offer.vendor} queryOffer={queryOffer} />
    </div>
  );
};

export default OfferPage;
