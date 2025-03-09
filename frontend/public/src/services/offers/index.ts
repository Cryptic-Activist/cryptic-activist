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
  const response = await fetchPost(BACKEND + '/offers/offer/create', data);

  if (response.status !== 200) return null;

  return response.data;
};
