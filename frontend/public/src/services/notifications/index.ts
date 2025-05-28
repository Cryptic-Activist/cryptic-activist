import { getBearerToken, getQueries } from '@/utils';

import { BACKEND } from '@/constants';
import { GetNotificationParams } from './types';
import { fetchGet } from '../axios';

export const getNotifications = async ({
  userId,
  ...rest
}: GetNotificationParams) => {
  const queries = getQueries(rest);
  const bearerToken = getBearerToken();
  try {
    const response = await fetchGet(
      `${BACKEND}/system-messages/${userId}` + queries,
      {
        Authorization: bearerToken,
      }
    );

    if (response.status !== 200) {
      return null;
    }

    return response.data;
  } catch (_error) {
    return null;
  }
};
