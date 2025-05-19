import { GetUserInfoReturn, Login2FAParams, LoginParams } from './types';
import { fetchGet, fetchPost } from '../axios';
import { getCookie, removeCookie } from '@/utils';

import { BACKEND } from '@/constants';

export const getUserToken = async ({
  password,
  usernameOrEmail,
}: LoginParams) => {
  const response = await fetchPost(BACKEND + '/users/auth/login', {
    password,
    usernameOrEmail,
  });

  if (response.status !== 200) return null;

  return response.data;
};

export const getUserToken2FA = async ({ userId, token2FA }: Login2FAParams) => {
  const response = await fetchPost(BACKEND + '/users/auth/2fa/login', {
    userId,
    token2FA,
  });

  if (response.status !== 200) return null;

  return response.data;
};

export const getUserFromToken = async (
  token: string
): Promise<GetUserInfoReturn | null> => {
  const response = await fetchGet(
    `${BACKEND}/users/auth/login/decode/token/${token}`,
    {
      Authorization: `Bearer ${token}`,
    }
  );

  if (response.status !== 200) return null;

  return response.data;
};

export const decodeAccessToken = async () => {
  try {
    const accessToken = getCookie('accessToken');

    if (!accessToken) return null;

    const userInfo = await getUserFromToken(accessToken);

    if (!userInfo) {
      removeCookie('accessToken');
      removeCookie('refreshToken');

      return null;
    }

    return userInfo;
  } catch (_err) {
    removeCookie('accessToken');
    removeCookie('refreshToken');

    return null;
  }
};
