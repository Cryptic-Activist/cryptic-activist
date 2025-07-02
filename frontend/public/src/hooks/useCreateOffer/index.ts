'use client';

import {
  CreateOfferPaymentMethod,
  CreateOfferTradeInstructions,
  CreateOfferTradePricing,
} from './zod';
import { getLocalStorage, setLocalStorage } from '@/utils';
import { useApp, useBlockchain, useUser } from '@/hooks';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { fetchPaymentDetails } from '@/services/paymentDetails';
import { useRootStore } from '@/store';

const useCreateOffer = () => {
  const { createOffer } = useRootStore();
  const {
    app: { defaults },
  } = useApp();
  const { user } = useUser();
  const {
    blockchain: { account },
  } = useBlockchain();

  const [step, setStep] = useState(0);
  // const [paymentDetailsList, setPaymentDetailsList] = useState([]);
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

  const paymentDetailsQuery = useMutation({
    mutationKey: ['paymentDetails', createOffer.paymentMethodId],
    mutationFn: fetchPaymentDetails,
  });

  useEffect(() => {
    createOffer.setCreateOfferValue(
      {
        fiat: defaults?.fiat,
        cryptocurrency: defaults?.cryptocurrency,
        chain: defaults?.chain,
      },
      'createOffer/setFiatCryptocurrencyChain'
    );
  }, [defaults?.cryptocurrency, defaults?.fiat, defaults?.chain]);

  useEffect(() => {
    console.log({ createOfferChain: createOffer });
    const validated = CreateOfferPaymentMethod.safeParse({
      fiat: createOffer?.fiat,
      chain: createOffer?.chain,
      cryptocurrency: createOffer?.cryptocurrency,
      offerType: createOffer?.offerType,
      paymentMethodId: createOffer?.paymentMethodId,
      paymentDetails: createOffer?.paymentDetails,
    });

    createOffer.setCreateOfferValue(
      { isPaymentMethodCompleted: validated.success },
      'createOffer/setIsPaymentMethodCompleted'
    );
  }, [
    createOffer?.fiat,
    createOffer?.cryptocurrency,
    createOffer?.chain,
    createOffer?.offerType,
    createOffer?.paymentMethodId,
    createOffer?.paymentDetails,
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
      kycOnly: createOffer?.kycOnly,
      label: createOffer?.label,
      terms: createOffer?.terms,
      instructions: createOffer?.instructions,
      vendorWalletAddress: account?.address,
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
    account?.address,
  ]);

  useEffect(() => {
    if (createOffer?.paymentMethodId && user.id) {
      paymentDetailsQuery.mutate(user.id);
    }
  }, [createOffer?.paymentMethodId, user?.id]);

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
      chain: createOffer.chain,
      vendorId: createOffer.vendorId,
      offerType: createOffer.offerType,
      paymentMethodId: createOffer.paymentMethodId,
      paymentDetails: createOffer.paymentDetails,
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
      kycOnly: createOffer.kycOnly,
    },
    step,
    onClickEvents,
    paymentDetailsQuery,
    setCreateOfferValue: createOffer.setCreateOfferValue,
    resetCreateOffer: createOffer.resetCreateOffer,
    toStep,
    saveCreateOfferLocally,
  };
};

export default useCreateOffer;
