'use client';

import { PaymentMethod, TradeInstructions, TradePricing } from '@/layouts';
import React, { useEffect } from 'react';
import {
  useBlockchain,
  useCreateOffer,
  useDynamicTitle,
  useRouter,
} from '@/hooks';

export default function Page() {
  const {
    createOffer,
    step,
    onClickEvents,
    setCreateOfferValue,
    toStep,
    saveCreateOfferLocally,
    resetCreateOffer,
  } = useCreateOffer();
  const {} = useDynamicTitle('Create an Offer | Cryptic Activist');
  const { blockchain } = useBlockchain();
  const { back } = useRouter();

  useEffect(() => {
    if (!blockchain.account?.address) {
      back();
    }
  }, [blockchain]);

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
}
