import { fetchGet, fetchPost } from '@/services/axios';

import { BACKEND } from '@/constants';
import { CreateOfferSetter } from '@/store/createOffer/types';
import { FetchOffersParams } from './types';
import { getQueries } from '@/utils';

export const fetchOffers = async (params: FetchOffersParams) => {
  const queries = getQueries(params);
  const response = await fetchGet(`${BACKEND}/offers` + queries);

  if (response.status !== 200) return null;

  return response.data;
};

export const fetchOffersPagination = async (params: FetchOffersParams) => {
  const queries = getQueries(params);
  const response = await fetchGet(`${BACKEND}/offers/pagination` + queries);

  if (response.status !== 200) return null;

  return response.data;
};

export const submitOfferCreate = async (data: CreateOfferSetter) => {
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
