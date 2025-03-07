'use client';

import { CreateOfferPaymentMethod, CreateOfferTradePricing } from './zod';
import { useEffect, useState } from 'react';

import { $createOffer } from '@/store';
import { setCreateOfferValues } from '@/store';
import useApp from '../useApp';
import { useStore } from '@nanostores/react';

const useCreateOffer = () => {
  const createOffer = useStore($createOffer);
  const {
    app: { defaults },
  } = useApp();
  const [step, setStep] = useState(0);
  const onClickEvents = {
    0: () => toStep(0),
    1: () => toStep(1),
    2: () => toStep(2),
  };

  useEffect(() => {
    setCreateOfferValues({
      fiat: defaults?.fiat,
      cryptocurrency: defaults?.cryptocurrency,
    });
  }, [defaults?.cryptocurrency, defaults?.fiat]);

  useEffect(() => {
    const validated = CreateOfferPaymentMethod.safeParse({
      fiat: createOffer?.fiat,
      cryptocurrency: createOffer?.cryptocurrency,
      offerType: createOffer?.offerType,
      paymentMethodId: createOffer?.paymentMethodId,
    });

    setCreateOfferValues({ isPaymentMethodCompleted: validated.success });
  }, [
    createOffer?.fiat,
    createOffer?.cryptocurrency,
    createOffer?.offerType,
    createOffer?.paymentMethodId,
  ]);

  useEffect(() => {
    const validated = CreateOfferTradePricing.safeParse({
      tradePricingType: createOffer?.tradePricingType,
      listAt: createOffer?.listAt,
      limitMax: createOffer?.limitMax,
      limitMin: createOffer?.limitMin,
      timeLimit: createOffer?.timeLimit,
    });

    setCreateOfferValues({ isTradePricingCompleted: validated.success });
  }, [
    createOffer?.tradePricingType,
    createOffer?.listAt,
    createOffer?.limitMin,
    createOffer?.limitMax,
    createOffer?.timeLimit,
  ]);

  const toStep = (step: number) => {
    setStep(step);
  };

  return {
    createOffer,
    step,
    onClickEvents,
    setCreateOfferValues,
    toStep,
  };
};

export default useCreateOffer;
