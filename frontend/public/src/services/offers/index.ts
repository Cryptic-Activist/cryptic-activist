import { AxiosResponse, fetchGet, fetchPost } from '@/services/axios';

import { BACKEND } from '@/constants';
import { CreateOffer } from '@/zustand/createOffer/types';

export const fetchOffers = async (): Promise<AxiosResponse | null> => {
  const response = await fetchGet(`${BACKEND}/offers`);

  if (response.status !== 200) {
    return null;
  }

  return response;
};

export const submitOfferCreate = async (data: CreateOffer) => {
  const payload = {
    vendorId: data.createOffer.vendorId,
    cryptocurrencyId: data.createOffer.cryptocurrency?.id,
    fiatId: data.createOffer.fiat?.id,
    offerType: data.createOffer.offerType,
    paymentMethodId: data.createOffer.paymentMethodId,
    pricingType: data.createOffer.pricingType,
    listAt: data.createOffer.listAt,
    limitMin: data.createOffer.limitMin,
    limitMax: data.createOffer.limitMax,
    timeLimit: data.createOffer.timeLimit,
    tags: data.createOffer.tags,
    label: data.createOffer.label,
    terms: data.createOffer.terms,
    instructions: data.createOffer.instructions,
  };
  const response = await fetchPost(BACKEND + '/offers/offer/create', payload);

  if (response.status !== 200) return null;

  return response.data;
};
