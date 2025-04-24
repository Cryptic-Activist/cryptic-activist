import { Generate2FAParams, Verify2FAParams } from './types';

import { BACKEND } from '@/constants';
import { fetchPost } from '@/services/axios';
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

export const verify2FA = async (params: Verify2FAParams) => {
  try {
    const accessToken = getCookie('accessToken');
    const response = await fetchPost(
      `${BACKEND}/users/auth/2fa/verify/` + params.token,
      { userId: params.userId },
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
