import { StartTradeParam, getCurrentTradingFeeParams } from './types';
import { fetchGet, fetchPost } from '@/services/axios';
import { getBearerToken, getQueries } from '@/utils';

import { BACKEND } from '@/constants';

export const startTrade = async (params: StartTradeParam) => {
  const bearerToken = getBearerToken();
  const response = await fetchPost(`${BACKEND}/trades/trade/create`, params, {
    Authorization: bearerToken,
  });

  if (response.status !== 200) return null;

  return response.data;
};

export const getCurrentTradingFee = async (
  params: getCurrentTradingFeeParams
) => {
  const queries = getQueries(params);
  const bearerToken = getBearerToken();
  const response = await fetchGet(
    `${BACKEND}/trades/trade/calculate-receiving` + queries,
    { Authorization: bearerToken }
  );

  if (response.status !== 200) return null;

  return response.data;
};
