import { fetchGet, fetchPost } from '@/services/axios';

import { BACKEND } from '@/constants';
import { Period } from '@/hooks/usePremium/types';
import { Wallet } from '@/store/blockchain/types';
import { getBearerToken } from '@/utils';

export const subscribeToPremium = async (
  userId: string,
  period: Period,
  wallet: Wallet,
  paymentHash: string,
  txHash: string
) => {
  const bearerToken = getBearerToken();
  const response = await fetchPost(
    `${BACKEND}/premium/subscribe`,
    {
      userId,
      period,
      payerAddress: wallet,
      paymentHash,
      txHash,
    },
    { Authorization: bearerToken }
  );

  if (response.status === 409) return { error: response.data.error };

  if (response.status !== 200) return null;

  return response.data;
};

export const changeSubscriptionTo = async (
  userId: any,
  period: Period,
  wallet: Wallet,
  paymentHash: string,
  txHash: string
) => {
  const bearerToken = getBearerToken();

  const response = await fetchPost(
    `${BACKEND}/premium/subscription/change/${period.toLowerCase()}`,
    {
      userId,
      period,
      payerAddress: wallet,
      paymentHash,
      txHash,
    },
    { Authorization: bearerToken }
  );

  if (response.status !== 200) return null;

  return response.data;
};

export const getUsdcTokenABI = async (abiUrl: string) => {
  const response = await fetchGet(abiUrl);

  if (response.status !== 200) return null;

  return response.data;
};
