'use client';

import { PaymentMethod, TradeInstructions, TradePricing } from '@/layouts';

import React from 'react';
import { useCreateOffer } from '@/hooks';

const Page = () => {
  const {
    createOffer,
    step,
    onClickEvents,
    setCreateOfferValue,
    toStep,
    saveCreateOfferLocally,
    resetCreateOffer,
  } = useCreateOffer();

  return (
    <>
      {step === 0 && (
        <PaymentMethod
          setCreateOfferValue={setCreateOfferValue}
          toStep={toStep}
          createOffer={createOffer}
          step={step}
          onClickEvents={onClickEvents}
          saveCreateOfferLocally={saveCreateOfferLocally}
        />
      )}
      {step == 1 && (
        <TradePricing
          setCreateOfferValue={setCreateOfferValue}
          toStep={toStep}
          createOffer={createOffer}
          step={step}
          onClickEvents={onClickEvents}
          saveCreateOfferLocally={saveCreateOfferLocally}
        />
      )}
      {step == 2 && (
        <TradeInstructions
          setCreateOfferValue={setCreateOfferValue}
          toStep={toStep}
          createOffer={createOffer}
          step={step}
          onClickEvents={onClickEvents}
          saveCreateOfferLocally={saveCreateOfferLocally}
          resetCreateOffer={resetCreateOffer}
        />
      )}
    </>
  );
};

export default Page;
