'use client';

import { PaymentMethod, TradeInstructions, TradePricing } from '@/layouts';
import { useBlockchain, useCreateOffer, useDynamicTitle } from '@/hooks';

import React from 'react';
import { validateWithAuthToken } from '@/services/user';
import { withAuth } from '@/hoc/withAuth';

function OfferCreatePage() {
  const {
    createOffer,
    step,
    onClickEvents,
    paymentDetailsQuery,
    setCreateOfferValue,
    toStep,
    saveCreateOfferLocally,
    resetCreateOffer,
  } = useCreateOffer();

  const {} = useDynamicTitle('Create an Offer | Cryptic Activist');
  const {
    blockchain: { account },
  } = useBlockchain();

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
          paymentDetailsQuery={paymentDetailsQuery}
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
          vendorWalletAddress={account?.address}
        />
      )}
    </>
  );
}

export default withAuth(OfferCreatePage);
