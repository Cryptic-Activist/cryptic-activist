'use client';

import { Item } from '@/components/Radio/types';
import { PricingItem } from '@/components/PricingType/types';
import { editOfferResolver } from './zod';
import { getEditOffer } from '@/services/offer';
import useApp from '../useApp';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import useUser from '../useUser';

const useEditOffer = () => {
  const params = useParams();
  const offerId = params.id?.toString();
  const { user } = useUser();
  const {
    setValue,
    app: { defaults },
  } = useApp();

  const {
    register,
    handleSubmit,
    getValues,
    setValue: setValueForm,
  } = useForm({ resolver: editOfferResolver });

  const query = useQuery({
    queryKey: ['editOffer', offerId, user.id ?? ''],
    queryFn: async () => {
      if (offerId && user.id) {
        const data = await getEditOffer(user.id, offerId);
        return data;
      }
      return null;
    },
  });

  const selectOfferType = (value: Item) => {
    setValueForm('offerType', value.value);
  };

  const selectPaymentMethod = (id: string) => {
    setValueForm('paymentMethodId', id);
  };

  const inputPaymentDetails = (_value: string) => {
    // setValueForm('paymentDetails', value);
  };

  const selectRateType = (pricingType: PricingItem) => {
    if (pricingType.value === 'market') {
      setValueForm('listAt', 2.35);
    }
    setValueForm('pricingType', pricingType.value);
  };

  const inputListAt = (value: number) => {
    setValueForm('listAt', value);
  };

  const inputMinTradeAmount = (value: number) => {
    setValueForm('limitMin', value);
  };

  const inputMaxTradeAmount = (value: number) => {
    setValueForm('limitMax', value);
  };

  const inputTradeTimeLimit = (value: number) => {
    setValueForm('timeLimit', value);
  };

  const inputTags = (value: string[]) => {
    setValueForm('tags', value);
  };

  const inputLabel = (value: string) => {
    setValueForm('label', value);
  };

  const inputTerms = (value: string) => {
    setValueForm('terms', value);
  };

  const inputInstructions = (value: string) => {
    setValueForm('instructions', value);
  };

  const onSubmit = (_data: any) => {
    // console.log({ data });
  };

  useEffect(() => {
    if (query.data) {
      const { fiat, cryptocurrency } = query.data;
      setValue({
        defaults: {
          fiat: {
            country: fiat.country,
            id: fiat.id,
            name: fiat.name,
            symbol: fiat.symbol,
          },
          cryptocurrency: {
            id: cryptocurrency.id,
            name: cryptocurrency.name,
            symbol: cryptocurrency.symbol,
            coingeckoId: cryptocurrency.coingeckoId,
            image: cryptocurrency.image,
          },
        },
      });
      setValueForm('fiat', fiat);
      setValueForm('cryptocurrency', cryptocurrency);
      setValueForm('paymentMethodId', query.data.paymentMethodId);
      // setValueForm('paymentDetails', query.data.paymentDetails);
      // selectOfferType({
      //   label: query.data.offerType,
      //   value: query.data.offerType,
      // });
      // selectRateType({
      //   label: query.data.pricingType,
      //   value: query.data.pricingType,
      // });
      setValueForm('pricingType', query.data.pricingType);
      setValueForm('offerType', query.data.offerType);
      setValueForm('listAt', query.data.listAt);
      setValueForm('limitMin', query.data.limitMin);
      setValueForm('limitMax', query.data.limitMax);
      setValueForm('timeLimit', query.data.timeLimit);
      setValueForm('tags', query.data.tags);
      setValueForm('label', query.data.label);
      setValueForm('terms', query.data.terms);
      setValueForm('instructions', query.data.instructions);
      setValueForm('vendorWalletAddress', query.data.vendorWalletAddress);
    }
  }, [query.data]);

  useEffect(() => {
    if (defaults.cryptocurrency) {
      setValueForm('cryptocurrency', defaults.cryptocurrency);
    }
  }, [defaults.cryptocurrency]);

  useEffect(() => {
    if (defaults.fiat) {
      setValueForm('fiat', defaults.fiat);
    }
  }, [defaults.fiat]);

  return {
    query,
    formVaules: {
      fiat: getValues('fiat'),
      cryptocurrency: getValues('cryptocurrency'),
      offerType: getValues('offerType'),
      paymentMethodId: getValues('paymentMethodId'),
      // paymentDetails: getValues('paymentDetails'),
      pricingType: getValues('pricingType'),
      listAt: getValues('listAt'),
      limitMin: getValues('limitMin'),
      limitMax: getValues('limitMax'),
      timitLimit: getValues('timeLimit'),
      tags: getValues('tags'),
      label: getValues('label'),
      terms: getValues('terms'),
      instructions: getValues('instructions'),
      vendorWalletAddress: getValues('vendorWalletAddress'),
    },
    onSubmit,
    register,
    handleSubmit,
    selectOfferType,
    selectPaymentMethod,
    inputPaymentDetails,
    selectRateType,
    inputListAt,
    inputMinTradeAmount,
    inputMaxTradeAmount,
    inputTradeTimeLimit,
    inputTags,
    inputLabel,
    inputTerms,
    inputInstructions,
  };
};

export default useEditOffer;
