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
import { FaChevronLeft } from 'react-icons/fa6';
import Head from 'next/head';
import type { PricingItem } from '@/components/PricingType/types';
import stylesCore from '../index.module.scss';

const CreateOfferTradePricing: FC<CreateOfferTradePricingProps> = ({
  setCreateOfferValue,
  toStep,
  saveCreateOfferLocally,
  createOffer,
  step,
  onClickEvents,
}) => {
  const selectRateType = (pricingType: PricingItem) => {
    if (pricingType.value === 'market') {
      setCreateOfferValue({ listAt: 2.35 }, 'createOffer/setListAt');
    }
    setCreateOfferValue(
      { pricingType: pricingType.value },
      'createOffer/setPricingType'
    );
  };

  const inputLimit = (value: number) => {
    setCreateOfferValue({ listAt: value }, 'createOffer/ListAt');
  };

  const inputMinTradeAmount = (value: number) => {
    setCreateOfferValue({ limitMin: value }, 'createOffer/setLimitMin');
  };

  const inputMaxTradeAmount = (value: number) => {
    setCreateOfferValue({ limitMax: value }, 'createOffer/setLimitMax');
  };

  const inputTradeTimeLimit = (value: number) => {
    setCreateOfferValue({ timeLimit: value }, 'createOffer/setTimeLimit');
  };

  const goToNextStep = () => {
    if (createOffer.isTradePricingCompleted) {
      saveCreateOfferLocally();
      toStep(2);
    }
  };

  const backToPaymentMethod = () => {
    saveCreateOfferLocally();
    toStep(0);
  };

  return (
    <>
      <Head>
        <title>Trade Instructions | Create Offer - Cryptic Activist</title>
      </Head>
      <div className={stylesCore.container}>
        <div className={stylesCore.main}>
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
          {(createOffer?.pricingType === 'fixed' ||
            createOffer?.pricingType === 'market') && (
            <section className={stylesCore.horizontalGroup}>
              <h2 className={stylesCore.groupHeading}>
                {createOffer?.pricingType === 'fixed' &&
                  'Percent above market rate your offer will list at'}
                {createOffer?.pricingType === 'market' &&
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
        </div>
        <aside className={stylesCore.aside}>
          <h3 className={stylesCore.asideHeading}>About the Trade Pricing</h3>
          <section className={stylesCore.horizontalGroup}>
            <p className={stylesCore.asideStatement}>
              In this step you&apos;ll be asked for the payment method of your
              offer
            </p>
            <p className={stylesCore.asideStatement}>
              Make your selection on payment method and move onto the next step.
            </p>
          </section>
          <div className={stylesCore.buttons}>
            <Button padding="1em" type="button" onClick={backToPaymentMethod}>
              <FaChevronLeft size={18} />
            </Button>
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
          </div>
        </aside>
      </div>
    </>
  );
};

export default CreateOfferTradePricing;
