'use client';

import {
  CreateOfferPaymentMethod,
  CreateOfferTradeInstructions,
  CreateOfferTradePricing,
} from './zod';
import { getLocalStorage, setLocalStorage } from '@/utils';
import { useApp, useUser } from '@/hooks';
import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRootStore } from '@/store';

const useCreateOffer = () => {
  const { createOffer } = useRootStore();
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
      createOffer.setCreateOfferValue(
        { vendorId: user.id },
        'createOffer/setVendor'
      );
      return true;
    },
    refetchOnMount: true,
  });
  const {} = useQuery({
    queryFn: () => {
      const savedCreateOfferString = getLocalStorage('createOffer');
      if (!savedCreateOfferString) {
        return false;
      }
      const savedCreateOffer = JSON.parse(savedCreateOfferString);
      createOffer.setCreateOfferValue(
        { ...savedCreateOffer },
        'createOffer/setCreateOfferFromLocalStorage'
      );
      return true;
    },
    queryKey: ['savedCreateOffer'],
    refetchOnMount: false,
  });

  useEffect(() => {
    createOffer.setCreateOfferValue(
      {
        fiat: defaults?.fiat,
        cryptocurrency: defaults?.cryptocurrency,
      },
      'createOffer/setFiatCryptocurrency'
    );
  }, [defaults?.cryptocurrency, defaults?.fiat]);

  useEffect(() => {
    const validated = CreateOfferPaymentMethod.safeParse({
      fiat: createOffer?.fiat,
      cryptocurrency: createOffer?.cryptocurrency,
      offerType: createOffer?.offerType,
      paymentMethodId: createOffer?.paymentMethodId,
    });

    createOffer.setCreateOfferValue(
      { isPaymentMethodCompleted: validated.success },
      'createOffer/setIsPaymentMethodCompleted'
    );
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

    createOffer.setCreateOfferValue(
      { isTradePricingCompleted: validated.success },
      'createOffer/setIsTradePricingCompleted'
    );
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

    createOffer.setCreateOfferValue(
      {
        isTradeInstructionsCompleted: validated.success,
      },
      'createOffer/setTradeInstructionsCompleted'
    );
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
    createOffer: {
      cryptocurrency: createOffer.cryptocurrency,
      fiat: createOffer.fiat,
      vendorId: createOffer.vendorId,
      offerType: createOffer.offerType,
      paymentMethodId: createOffer.paymentMethodId,
      isPaymentMethodCompleted: createOffer.isPaymentMethodCompleted,
      pricingType: createOffer.pricingType,
      listAt: createOffer.listAt,
      limitMin: createOffer.limitMin,
      limitMax: createOffer.limitMax,
      timeLimit: createOffer.timeLimit,
      isTradePricingCompleted: createOffer.isTradePricingCompleted,
      tags: createOffer.tags,
      label: createOffer.label,
      terms: createOffer.terms,
      instructions: createOffer.instructions,
      isTradeInstructionsCompleted: createOffer.isTradeInstructionsCompleted,
    },
    step,
    onClickEvents,
    setCreateOfferValue: createOffer.setCreateOfferValue,
    resetCreateOffer: createOffer.resetCreateOffer,
    toStep,
    saveCreateOfferLocally,
  };
};

export default useCreateOffer;
