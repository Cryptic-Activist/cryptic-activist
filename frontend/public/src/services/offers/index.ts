import { fetchGet, fetchPost } from '@/services/axios';
import { getBearerToken, getQueries } from '@/utils';

import { BACKEND } from '@/constants';
import { CreateOfferSetter } from '@/store/createOffer/types';
import { FetchOffersParams } from './types';

export const fetchOffersPagination = async ({
  cursor,
  ...rest
}: FetchOffersParams) => {
  const queriesObj = {
    ...rest,
  } as unknown as FetchOffersParams;
  if (cursor) {
    queriesObj.cursor = cursor;
  }
  const queries = getQueries(queriesObj as any);
  const response = await fetchGet(`${BACKEND}/offers/pagination` + queries);

  if (response.status !== 200) return null;

  return response.data;
};

export const fetchOffersPaymentMethods = async () => {
  const response = await fetchGet(`${BACKEND}/offers/payment-methods`);

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
  console.log({ data });
  const bearerToken = getBearerToken();
  const payload = {
    vendorId: data.vendorId,
    cryptocurrencyId: data.cryptocurrency?.id,
    fiatId: data.fiat?.id,
    chainId: data.chain?.id,
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
    kycOnly: data.kycOnly,
    vendorWalletAddress: data.vendorWalletAddress,
    paymentDetails: data.paymentDetails,
  };
  const response = await fetchPost(BACKEND + '/offers/offer/create', payload, {
    Authorization: bearerToken,
  });

  if (response.status !== 200) return null;

  return response.data;
};
