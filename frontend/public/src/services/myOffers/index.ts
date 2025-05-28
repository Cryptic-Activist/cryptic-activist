import { BACKEND } from '@/constants';
import { FetchOffersParams } from './types';
import { fetchGet } from '@/services/axios';
import { getQueries } from '@/utils';

export const fetchMyOffersPagination = async ({
  userId,
  ...rest
}: FetchOffersParams) => {
  const queries = getQueries(rest);
  const response = await fetchGet(
    `${BACKEND}/offers/${userId}/pagination` + queries
  );

  if (response.status !== 200) return null;

  return response.data;
};
