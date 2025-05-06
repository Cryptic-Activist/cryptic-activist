import { fetchGet, fetchPut } from '@/services/axios';
import { getBearerToken, getQueries } from '@/utils';

import { BACKEND } from '@/constants';

export const getOffer = async (id: string) => {
  const queries = getQueries({
    associations: 'cryptocurrency,fiat,paymentMethod,vendor',
  });
  const response = await fetchGet(`${BACKEND}/offers/offer/` + id + queries);

  if (response.status !== 200) return null;

  return response.data;
};

export const getEditOffer = async (userId: string, offerId: string) => {
  const bearerToken = getBearerToken();
  const response = await fetchGet(
    `${BACKEND}/offers/offer/${userId}/${offerId}`,
    { Authorization: bearerToken }
  );

  if (response.status !== 200) return null;

  return response.data;
};

export const deleteOffer = async (userId: string, offerId: string) => {
  const bearerToken = getBearerToken();
  const response = await fetchPut(
    `${BACKEND}/offers/offer/${userId}/${offerId}`,
    {},
    { Authorization: bearerToken }
  );

  if (response.status !== 200) return null;

  return response.data;
};
