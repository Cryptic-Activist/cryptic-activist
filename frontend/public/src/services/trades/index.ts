import { BACKEND } from '@/constants';
import { GetTradesByUserAs } from './types';
import { fetchGet } from '@/services/axios';
import { getBearerToken } from '@/utils';

export const getTradesByUser = async (
  userId: string,
  as: GetTradesByUserAs
) => {
  const bearerToken = getBearerToken();
  const response = await fetchGet(`${BACKEND}/trades/user/${userId}/${as}`, {
    Authorization: bearerToken,
  });

  if (response.status !== 200) return null;

  return response.data;
};
