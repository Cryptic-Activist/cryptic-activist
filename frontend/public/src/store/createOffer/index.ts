import { CreateOfferSetter, CreateOfferState } from './types';

import { map } from 'nanostores';

export const $createOffer = map<CreateOfferState>({
  errors: [],
  fetched: false,
  loading: false,
});

const setter = ({ errors, fetched, loading, data }: CreateOfferSetter) => {
  const createOffer = $createOffer.get();

  $createOffer.set({
    errors: errors ?? createOffer.errors,
    fetched: fetched ?? createOffer.fetched,
    loading: loading ?? createOffer.loading,
    data: {
      section: {
        paymentMethod:
          data?.section?.paymentMethod ??
          createOffer.data?.section?.paymentMethod,
        tradeInstructions:
          data?.section?.tradeInstructions ??
          createOffer.data?.section?.tradeInstructions,
        tradePricing:
          data?.section?.tradePricing ??
          createOffer.data?.section?.tradePricing,
      },
      cryptocurrency: data?.cryptocurrency ?? createOffer.data?.cryptocurrency,
      fiat: data?.fiat ?? createOffer.data?.fiat,
      offerType: data?.offerType ?? createOffer.data?.offerType,
      paymentMethodId:
        data?.paymentMethodId ?? createOffer.data?.paymentMethodId,
      isPaymentMethodCompleted:
        data?.isPaymentMethodCompleted ??
        createOffer.data?.isPaymentMethodCompleted,
      tradePricingType:
        data?.tradePricingType ?? createOffer.data?.tradePricingType,
      listAt: data?.listAt ?? createOffer.data?.listAt,
      limitMin: data?.limitMin ?? createOffer.data?.limitMin,
      limitMax: data?.limitMax ?? createOffer.data?.limitMax,
      timeLimit: data?.timeLimit ?? createOffer.data?.timeLimit,
      isTradePricingCompleted:
        data?.isTradePricingCompleted ??
        createOffer.data?.isTradePricingCompleted,
      tags: data?.tags ?? createOffer.data?.tags,
      label: data?.label ?? createOffer.data?.label,
      terms: data?.terms ?? createOffer.data?.terms,
      instructions: data?.instructions ?? createOffer.data?.instructions,
      isTradeInstructionsCompleted:
        data?.isTradeInstructionsCompleted ??
        createOffer.data?.isTradeInstructionsCompleted,
      isFilled: data?.isFilled ?? createOffer.data?.isFilled,
      isSubmitted: data?.isSubmitted ?? createOffer.data?.isSubmitted,
    },
  });
};

export const setCreateOfferValues = (params: CreateOfferSetter) => {
  setter({ ...params });
};
