import { CreateOfferSetter, CreateOfferState } from './types';

import { map } from 'nanostores';

export const $createOffer = map<CreateOfferState>();

const setter = (data: CreateOfferSetter) => {
  const createOffer = $createOffer.get();

  $createOffer.set({
    cryptocurrency: data?.cryptocurrency ?? createOffer?.cryptocurrency,
    fiat: data?.fiat ?? createOffer?.fiat,
    vendorId: data?.vendorId ?? createOffer.vendorId,
    offerType: data?.offerType ?? createOffer?.offerType,
    paymentMethodId: data?.paymentMethodId ?? createOffer?.paymentMethodId,
    isPaymentMethodCompleted:
      data?.isPaymentMethodCompleted ?? createOffer?.isPaymentMethodCompleted,
    pricingType: data?.pricingType ?? createOffer?.pricingType,
    listAt: data?.listAt ?? createOffer?.listAt,
    limitMin: data?.limitMin ?? createOffer?.limitMin,
    limitMax: data?.limitMax ?? createOffer?.limitMax,
    timeLimit: data?.timeLimit ?? createOffer?.timeLimit,
    isTradePricingCompleted:
      data?.isTradePricingCompleted ?? createOffer?.isTradePricingCompleted,
    tags: data?.tags ?? createOffer?.tags,
    label: data?.label ?? createOffer?.label,
    terms: data?.terms ?? createOffer?.terms,
    instructions: data?.instructions ?? createOffer?.instructions,
    isTradeInstructionsCompleted:
      data?.isTradeInstructionsCompleted ??
      createOffer?.isTradeInstructionsCompleted,
    isFilled: data?.isFilled ?? createOffer?.isFilled,
    isSubmitted: data?.isSubmitted ?? createOffer?.isSubmitted,
  });
};

export const setCreateOfferValues = (params: CreateOfferSetter) => {
  setter({ ...params });
};

export const resetCreateOfferValues = () => {
  let reseted: { [key: string]: any } = {};
  Object.keys($createOffer.get()).forEach((key) => {
    reseted[key] = undefined;
  });
  console.log({ resetedValues: reseted });
  setter({ ...reseted });
};
