import { BACKEND } from '@/constants';
import { FetchOffersParams } from './types';
import { fetchGet } from '@/services/axios';
import { getQueries } from '@/utils';

export const fetchMyOffersPagination = async ({
  cursor,
  userId,
  ...rest
}: FetchOffersParams) => {
  const queriesObj = {
    ...rest,
  } as unknown as FetchOffersParams;
  if (cursor) {
    queriesObj.cursor = cursor;
  }
  const queries = getQueries(queriesObj as any);
  const response = await fetchGet(
    `${BACKEND}/offers/${userId}/pagination` + queries
  );

  if (response.status !== 200) return null;

  return response.data;
};
