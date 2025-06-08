import { StartTradeParam, getCurrentTradingFeeParams } from './types';
import { fetchGet, fetchPost, fetchPut } from '@/services/axios';
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
    `${BACKEND}/trades/trade/calculate/receiving` + queries,
    { Authorization: bearerToken }
  );

  if (response.status !== 200) return null;

  return response.data;
};

export const getTrade = async (id: string) => {
  const queries = getQueries({
    associations: 'cryptocurrency,fiat,paymentMethod,vendor',
  });
  const bearerToken = getBearerToken();
  const response = await fetchGet(`${BACKEND}/trades/trade/` + id + queries, {
    Authorization: bearerToken,
  });

  if (response.status !== 200) return null;

  return response.data;
};

export const getTradeDetails = async (id: string) => {
  const bearerToken = getBearerToken();
  const response = await fetchGet(
    `${BACKEND}/trades/trade/` + id + '/details',
    {
      Authorization: bearerToken,
    }
  );

  if (response.status !== 200) return null;

  return response.data;
};

export const checkTradePaid = async (id: string) => {
  const bearerToken = getBearerToken();
  const response = await fetchGet(`${BACKEND}/trades/trade/` + id + '/paid', {
    Authorization: bearerToken,
  });

  if (response.status !== 200) return null;

  return response.data;
};

export const updateTradeVendorWalletAddress = async (
  tradeId: string,
  vendorWalletAddress: string
) => {
  const bearerToken = getBearerToken();
  const response = await fetchPut(
    `${BACKEND}/trades/trade/` + tradeId + '/vendor-wallet-address',
    {
      vendorWalletAddress,
    },
    {
      Authorization: bearerToken,
    }
  );

  if (response.status !== 200) return null;

  return response.data;
};

export const getDisputeTypes = async () => {
  const bearerToken = getBearerToken();
  const response = await fetchGet(`${BACKEND}/disputes/dispute/types`, {
    Authorization: bearerToken,
  });

  if (response.status !== 200) return null;

  return response.data;
};

// export const submitDispute = async (formData: SubmitDisputeParams) => {
//   const bearerToken = getBearerToken();
//   const response = await fetchPost(`${BACKEND}/dispute`, {
//     Authorization: bearerToken,
//   });

//   if (response.status !== 200) return null;

//   return response.data;
// };
