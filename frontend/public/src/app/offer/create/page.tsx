'use client';

import { PaymentMethod, TradeInstructions, TradePricing } from '@/layouts';

import React from 'react';
import { useCreateOffer } from '@/hooks';

const Page = () => {
  const { createOffer, setCreateOfferValues } = useCreateOffer();

  return (
    <>
      {createOffer.data?.section?.paymentMethod && (
        <PaymentMethod
          setCreateOfferValues={setCreateOfferValues}
          createOffer={createOffer}
        />
      )}
      {createOffer.data?.section?.tradePricing && (
        <TradePricing
          setCreateOfferValues={setCreateOfferValues}
          createOffer={createOffer}
        />
      )}
      {createOffer.data?.section?.tradeInstructions && (
        <TradeInstructions
          setCreateOfferValues={setCreateOfferValues}
          createOffer={createOffer}
        />
      )}
    </>
  );
};

export default Page;
