'use client';

import {
  CreateOfferPaymentMethod,
  CreateOfferTradeInstructions,
  CreateOfferTradePricing,
} from './zod';
import { getLocalStorage, setLocalStorage } from '@/utils';
import { useApp, useUser } from '@/hooks';
import { useEffect, useState } from 'react';

import { $createOffer } from '@/store';
import { setCreateOfferValues } from '@/store';
import { useQuery } from '@tanstack/react-query';
import { useStore } from '@nanostores/react';

const useCreateOffer = () => {
  const createOffer = useStore($createOffer);
  const {
    app: { defaults },
  } = useApp();
  const { user } = useUser();
  const [step, setStep] = useState(0);
  const onClickEvents = {
    0: () => toStep(0),
    1: () => toStep(1),
    2: () => toStep(2),
  };
  const {} = useQuery({
    queryKey: ['vendor', user.id],
    enabled: !!user.id,
    queryFn: () => {
      setCreateOfferValues({ vendorId: user.id });
      return true;
    },
    refetchOnMount: false,
  });
  const {} = useQuery({
    queryFn: () => {
      const savedCreateOfferString = getLocalStorage('createOffer');
      if (!savedCreateOfferString) {
        return false;
      }
      const savedCreateOffer = JSON.parse(savedCreateOfferString);
      setCreateOfferValues(savedCreateOffer);
      return true;
    },
    queryKey: ['savedCreateOffer'],
    refetchOnMount: false,
  });

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
      pricingType: createOffer?.pricingType,
      listAt: createOffer?.listAt,
      limitMax: createOffer?.limitMax,
      limitMin: createOffer?.limitMin,
      timeLimit: createOffer?.timeLimit,
    });

    setCreateOfferValues({ isTradePricingCompleted: validated.success });
  }, [
    createOffer?.pricingType,
    createOffer?.listAt,
    createOffer?.limitMin,
    createOffer?.limitMax,
    createOffer?.timeLimit,
  ]);

  useEffect(() => {
    const validated = CreateOfferTradeInstructions.safeParse({
      tags: createOffer?.tags,
      label: createOffer?.label,
      terms: createOffer?.terms,
      instructions: createOffer?.instructions,
    });

    setCreateOfferValues({ isTradeInstructionsCompleted: validated.success });
  }, [
    createOffer?.tags,
    createOffer?.label,
    createOffer?.terms,
    createOffer?.instructions,
  ]);

  const toStep = (step: number) => {
    setStep(step);
  };

  const saveCreateOfferLocally = () => {
    setLocalStorage('createOffer', JSON.stringify(createOffer));
  };

  return {
    createOffer,
    step,
    onClickEvents,
    setCreateOfferValues,
    toStep,
    saveCreateOfferLocally,
  };
};

export default useCreateOffer;
