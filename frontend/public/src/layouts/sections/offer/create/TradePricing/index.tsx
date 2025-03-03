import { ListAt, MinusPlusInput, PricingType, ProgressBar } from '@/components';
import React, { FC } from 'react';

import { CreateOfferTradePricingProps } from './types';
import Head from 'next/head';
import { PricingItem } from '@/components/PricingType/types';
import styles from './index.module.scss';
import stylesCore from '../index.module.scss';
import { useApp } from '@/hooks';

const CreateOfferTradePricing: FC<CreateOfferTradePricingProps> = ({
  setCreateOfferValues,
  createOffer,
}) => {
  const {
    app: { currentPrice },
  } = useApp();

  const selectRateType = (item: PricingItem) => {
    setCreateOfferValues({ data: { tradePricingType: item.value } });
  };

  const inputLimit = (value: number) => {
    setCreateOfferValues({ data: { listAt: value } });
  };

  return (
    <>
      <Head>
        <title>Trade Instructions | Create Offer - Cryptic Activist</title>
      </Head>
      <div className={stylesCore.container}>
        <main className={stylesCore.main}>
          <h1 className={stylesCore.heading}>Create an Offer</h1>
          <ProgressBar
            steps={['Payment Method', 'Trade Pricing', 'Trade Instructions']}
            currentStep={1}
          />
          <section className={stylesCore.horizontalGroup}>
            <h2 className={stylesCore.groupHeading}>Step 2: Trade Pricing</h2>
            <PricingType onChange={selectRateType} />
          </section>
          {(createOffer.data?.tradePricingType === 'fixed' ||
            createOffer.data?.tradePricingType === 'market') && (
            <section className={stylesCore.horizontalGroup}>
              <h2 className={stylesCore.groupHeading}>
                {createOffer.data?.tradePricingType === 'fixed' &&
                  'Percent above market rate your offer will list at'}
                {createOffer.data?.tradePricingType === 'market' &&
                  'Price your offer will list at'}
              </h2>
              <ListAt onChange={inputLimit} />
            </section>
          )}
        </main>
        <aside className={stylesCore.aside}></aside>
      </div>
    </>
  );
};

export default CreateOfferTradePricing;
