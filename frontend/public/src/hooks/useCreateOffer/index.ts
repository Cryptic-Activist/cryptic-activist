'use client';

import {
  CreateOfferPaymentMethod,
  createOfferPaymentMethodResolver,
} from './zod';

import { $createOffer } from '@/store';
import { setCreateOfferValues } from '@/store';
import useApp from '../useApp';
import { useEffect } from 'react';
import { useStore } from '@nanostores/react';

const useCreateOffer = () => {
  const createOffer = useStore($createOffer);
  const {
    app: { defaults },
  } = useApp();

  useEffect(() => {
    setCreateOfferValues({
      data: {
        section: { paymentMethod: true },
        fiat: defaults.fiat,
        cryptocurrency: defaults.cryptocurrency,
      },
    });
  }, [defaults.cryptocurrency, defaults.fiat]);

  useEffect(() => {
    const validated = CreateOfferPaymentMethod.safeParse({
      fiat: createOffer.data?.fiat,
      cryptocurrency: createOffer.data?.cryptocurrency,
      offerType: createOffer.data?.offerType,
      paymentMethodId: createOffer.data?.paymentMethodId,
    });
    setCreateOfferValues({
      data: { isPaymentMethodCompleted: validated.success },
    });
  }, [
    createOffer.data?.fiat,
    createOffer.data?.cryptocurrency,
    createOffer.data?.offerType,
    createOffer.data?.paymentMethodId,
  ]);

  return { createOffer, setCreateOfferValues };
};

export default useCreateOffer;
