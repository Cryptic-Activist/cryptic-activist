'use client';

import { HowMuch, ThisOffer, ThisVendor } from '@/layouts/sections/offer/page';
import { useApp, useDynamicTitle, useOffer, useUser } from '@/hooks';

import React from 'react';
import styles from './index.module.scss';

const OfferPage = () => {
  const {} = useDynamicTitle('Offer | Cryptic Activist');
  const {
    offer,
    queryOffer,
    handleFiatAmount,
    createTrade,
    onSubmit,
    isLoggedIn,
    mutationStartTrade,
  } = useOffer();
  const {
    app: { currentPrice },
  } = useApp();
  const { user } = useUser();

  return (
    <div className={styles.container}>
      <HowMuch
        offer={offer}
        queryOffer={queryOffer}
        onChange={handleFiatAmount}
        createTrade={createTrade}
        onSubmit={onSubmit}
        user={user}
        isLoggedIn={isLoggedIn}
        mutationStartTrade={mutationStartTrade}
      />
      <ThisOffer offer={offer} currentPrice={currentPrice} />
      <ThisVendor vendor={offer.vendor} queryOffer={queryOffer} />
    </div>
  );
};

export default OfferPage;
