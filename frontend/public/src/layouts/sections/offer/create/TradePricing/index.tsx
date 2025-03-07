import {
  Button,
  ListAt,
  PricingType,
  ProgressBar,
  TradeLimit,
  TradeTime,
} from '@/components';
import React, { FC } from 'react';

import { CreateOfferTradePricingProps } from './types';
import Head from 'next/head';
import type { PricingItem } from '@/components/PricingType/types';
import stylesCore from '../index.module.scss';
import { useApp } from '@/hooks';

const CreateOfferTradePricing: FC<CreateOfferTradePricingProps> = ({
  setCreateOfferValues,
  toStep,
  createOffer,
  step,
  onClickEvents,
}) => {
  const {
    app: { currentPrice },
  } = useApp();

  const selectRateType = (item: PricingItem) => {
    setCreateOfferValues({ tradePricingType: item.value });
  };

  const inputLimit = (value: number) => {
    setCreateOfferValues({ listAt: value });
  };

  const inputMinTradeAmount = (value: number) => {
    setCreateOfferValues({ limitMin: value });
  };

  const inputMaxTradeAmount = (value: number) => {
    setCreateOfferValues({ limitMax: value });
  };

  const inputTradeTimeLimit = (value: number) => {
    setCreateOfferValues({ timeLimit: value });
  };

  const goToNextStep = () => {
    if (createOffer.isTradePricingCompleted) {
      toStep(2);
    }
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
            currentStep={step}
            onClickEvents={onClickEvents}
          />
          <section className={stylesCore.horizontalGroup}>
            <h2 className={stylesCore.groupHeading}>Step 2: Trade Pricing</h2>
            <PricingType onChange={selectRateType} createOffer={createOffer} />
          </section>
          {(createOffer?.tradePricingType === 'fixed' ||
            createOffer?.tradePricingType === 'market') && (
            <section className={stylesCore.horizontalGroup}>
              <h2 className={stylesCore.groupHeading}>
                {createOffer?.tradePricingType === 'fixed' &&
                  'Percent above market rate your offer will list at'}
                {createOffer?.tradePricingType === 'market' &&
                  'Price your offer will list at'}
              </h2>
              <ListAt onChange={inputLimit} createOffer={createOffer} />
            </section>
          )}
          <section className={stylesCore.horizontalGroup}>
            <h2 className={stylesCore.groupHeading}>Offer trade limits</h2>
            <TradeLimit
              createOffer={createOffer}
              inputMinTradeAmount={inputMinTradeAmount}
              inputMaxTradeAmount={inputMaxTradeAmount}
            />
          </section>
          <section className={stylesCore.horizontalGroup}>
            <h2 className={stylesCore.groupHeading}>Offer time limit</h2>
            <TradeTime
              createOffer={createOffer}
              inputTradeTimeLimit={inputTradeTimeLimit}
            />
          </section>
        </main>
        <aside className={stylesCore.aside}>
          <h3 className={stylesCore.asideHeading}>About the Trade Pricing</h3>
          <section className={stylesCore.horizontalGroup}>
            <p className={stylesCore.asideStatement}>
              In this step you'll be asked for the payment method of your offer
            </p>
            <p className={stylesCore.asideStatement}>
              Make your selection on payment method and move onto the next step.
            </p>
          </section>
          <Button
            fullWidth
            padding="1em"
            type="button"
            theme={createOffer?.isTradePricingCompleted ? 'primary' : 'ghost'}
            isDisabled={!createOffer?.isTradePricingCompleted}
            onClick={goToNextStep}
          >
            Go the next step: Trade Instructions
          </Button>
        </aside>
      </div>
    </>
  );
};

export default CreateOfferTradePricing;
