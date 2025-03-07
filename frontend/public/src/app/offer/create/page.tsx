'use client';

import { PaymentMethod, TradeInstructions, TradePricing } from '@/layouts';

import React from 'react';
import { useCreateOffer } from '@/hooks';

const Page = () => {
  const { createOffer, step, onClickEvents, setCreateOfferValues, toStep } =
    useCreateOffer();

  return (
    <>
      {step === 0 && (
        <PaymentMethod
          setCreateOfferValues={setCreateOfferValues}
          toStep={toStep}
          createOffer={createOffer}
          step={step}
          onClickEvents={onClickEvents}
        />
      )}
      {step == 1 && (
        <TradePricing
          setCreateOfferValues={setCreateOfferValues}
          toStep={toStep}
          createOffer={createOffer}
          step={step}
          onClickEvents={onClickEvents}
        />
      )}
      {step == 2 && (
        <TradeInstructions
          setCreateOfferValues={setCreateOfferValues}
          toStep={toStep}
          createOffer={createOffer}
          step={step}
          onClickEvents={onClickEvents}
        />
      )}
    </>
  );
};

export default Page;
