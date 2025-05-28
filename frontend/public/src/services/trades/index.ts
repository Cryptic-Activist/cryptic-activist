import { getBearerToken, getQueries } from '@/utils';

import { BACKEND } from '@/constants';
import { GetTradesByUserParams } from './types';
import { fetchGet } from '@/services/axios';

export const getTradesByUser = async ({
  as,
  userId,
  ...rest
}: GetTradesByUserParams) => {
  const queries = getQueries(rest);
  const bearerToken = getBearerToken();
  const response = await fetchGet(
    `${BACKEND}/trades/user/${userId}/${as}` + queries,
    {
      Authorization: bearerToken,
    }
  );

  if (response.status !== 200) return null;

  return response.data;
};
