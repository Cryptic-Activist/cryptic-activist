import { fetchGet, fetchPost } from '@/services/axios';

import { BACKEND } from '@/constants';
import { StartTradeParam } from './types';

export const startTrade = async (params: StartTradeParam) => {
  const response = await fetchPost(`${BACKEND}/trades/trade/create`, params);

  if (response.status !== 200) return null;

  return response.data;
};

export const getCurrentTradeFee = async () => {
  const response = await fetchGet(`${BACKEND}/trades/trade/fee`);

  if (response.status !== 200) return null;

  return response.data;
};
