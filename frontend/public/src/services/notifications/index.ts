import { BACKEND } from '@/constants';
import { fetchGet } from '../axios';
import { getBearerToken } from '@/utils';

export const getNotifications = async (userId: string) => {
  const bearerToken = getBearerToken();
  try {
    const response = await fetchGet(`${BACKEND}/system-messages/${userId}`, {
      Authorization: bearerToken,
    });

    if (response.status !== 200) {
      return null;
    }

    return response.data;
  } catch (_error) {
    return null;
  }
};
