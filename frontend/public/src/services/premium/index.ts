import { BACKEND } from '@/constants';
import { Period } from '@/hooks/usePremium/types';
import { fetchPost } from '@/services/axios';
import { getBearerToken } from '@/utils';

export const subscribeToPremium = async (userId: string, period: Period) => {
  const bearerToken = getBearerToken();
  const response = await fetchPost(
    `${BACKEND}/premium/subscribe`,
    {
      userId,
      period,
    },
    { Authorization: bearerToken }
  );

  if (response.status !== 200) return null;

  return response.data;
};
