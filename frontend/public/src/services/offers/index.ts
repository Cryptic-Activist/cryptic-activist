import { fetchGet, fetchPost } from '@/services/axios';

import { BACKEND } from '@/constants';
import { CreateOfferSetter } from '@/store/createOffer/types';
import { FetchOffersParams } from './types';

export const fetchOffersPagination = async ({
  limit,
  cursor,
  ...rest
}: FetchOffersParams) => {
  const params = new URLSearchParams({ limit: limit.toString(), ...rest });
  if (cursor) {
    params.set('cursor', cursor);
  }
  const response = await fetchGet(`${BACKEND}/offers/pagination?` + params);

  if (response.status !== 200) return null;

  return response.data;
};

export const fetchCurrentVendorOffers = async (vendorId: string) => {
  const response = await fetchGet(`${BACKEND}/offers/vendor/${vendorId}`);

  if (response.status !== 200) return null;

  return response.data;
};

export const submitOfferCreate = async (
  data: CreateOfferSetter & { vendorWalletAddress: string }
) => {
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
    vendorWalletAddress: data.vendorWalletAddress,
  };
  const response = await fetchPost(BACKEND + '/offers/offer/create', payload);

  if (response.status !== 200) return null;

  return response.data;
};
