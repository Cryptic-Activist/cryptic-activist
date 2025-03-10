import { AxiosResponse, fetchGet, fetchPost } from '@/services/axios';

import { BACKEND } from '@/constants';
import { CreateOffer } from '@/store/createOffer/types';

export const fetchOffers = async (): Promise<AxiosResponse | null> => {
  const response = await fetchGet(`${BACKEND}/offers`);

  if (response.status !== 200) {
    return null;
  }

  return response;
};

export const submitOfferCreate = async (data: CreateOffer) => {
  const payload = {
    vendorId: data.vendorId,
    cryptocurrencyId: data.cryptocurrency?.id,
    fiatId: data.fiat?.id,
    offerType: data.offerType,
    paymentMethodId: data.paymentMethodId,
    pricingType: data.pricingType,
    listAt: data.listAt,
    limitMin: data.limitMin,
    limitMax: data.limitMax,
    timeLimit: data.timeLimit,
    tags: data.tags,
    label: data.label,
    terms: data.terms,
    instructions: data.instructions,
  };
  const response = await fetchPost(BACKEND + '/offers/offer/create', payload);

  if (response.status !== 200) return null;

  return response.data;
};
