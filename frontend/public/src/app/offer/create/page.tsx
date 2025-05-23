'use client';

import { PaymentMethod, TradeInstructions, TradePricing } from '@/layouts';
import React, { useEffect } from 'react';
import {
  useApp,
  useBlockchain,
  useCreateOffer,
  useDynamicTitle,
  useUser,
} from '@/hooks';

export default function Page() {
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
  const {
    user: { id },
  } = useUser();
  const {} = useDynamicTitle('Create an Offer | Cryptic Activist');
  const {
    isWalletConnected,
    blockchain: { account },
  } = useBlockchain();
  const { addToast } = useApp();

  useEffect(() => {
    if (isWalletConnected === false && id) {
      addToast('info', 'Wallet must be connected to create an offer', 5000);
    }
  }, [isWalletConnected, id]);

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
