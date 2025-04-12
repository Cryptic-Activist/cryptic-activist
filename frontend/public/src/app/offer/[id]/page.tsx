'use client';

import { HowMuch, ThisOffer, ThisVendor } from '@/layouts/sections/offer/page';
import { useBlockchain, useDynamicTitle, useOffer, useUser } from '@/hooks';

import React from 'react';
import styles from './index.module.scss';

export default function OfferPage() {
  const {} = useDynamicTitle('Offer | Cryptic Activist');
  const {
    offer,
    queryOffer,
    handleFiatAmount,
    createTrade,
    onSubmit,
    isLoggedIn,
    mutationStartTrade,
    localCurrentPrice,
  } = useOffer();
  const { user } = useUser();
  const { blockchain } = useBlockchain();

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
        blockchain={blockchain}
      />
      <ThisOffer offer={offer} currentPrice={localCurrentPrice} />
      <ThisVendor vendor={offer.vendor} queryOffer={queryOffer} />
    </div>
  );
}
