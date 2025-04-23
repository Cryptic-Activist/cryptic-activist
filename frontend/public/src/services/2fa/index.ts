import { fetchGet, fetchPost } from '@/services/axios';

import { BACKEND } from '@/constants';
import { Generate2FAParams } from './types';
import { getCookie } from '@/utils';

export const generate2FA = async (params: Generate2FAParams) => {
  try {
    const accessToken = getCookie('accessToken');
    const response = await fetchPost(
      `${BACKEND}/users/auth/2fa/generate`,
      params,
      {
        Authorization: `Bearer ${accessToken}`,
      }
    );

    if (response.status !== 200) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

export const verify2FA = async (token: string) => {
  try {
    const accessToken = getCookie('accessToken');
    const response = await fetchGet(
      `${BACKEND}/users/auth/2fa/verify/` + token,
      { Authorization: `Bearer ${accessToken}` }
    );

    if (response.status !== 200) {
      return null;
    }

    return response.data;
  } catch (_error) {
    return null;
  }
};
