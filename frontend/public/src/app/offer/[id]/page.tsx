'use client';

import { HowMuch, ThisOffer, ThisVendor } from '@/layouts/sections/offer/page';

import React from 'react';
import styles from './index.module.scss';
import { useDynamicTitle } from '@/hooks';

const OfferPage = () => {
  const {} = useDynamicTitle('Offer | Cryptic Activist');

  return (
    <div className={styles.container}>
      <HowMuch />
      <ThisOffer />
      <ThisVendor />
    </div>
  );
};

export default OfferPage;
