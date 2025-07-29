import { GetUserInfoReturn, Login2FAParams, LoginParams } from './types';
import { fetchGet, fetchPost } from '../axios';
import { getBearerToken, getCookie, removeCookie } from '@/utils';

import { BACKEND } from '@/constants';
import api from '../api';

export const getUserToken = async ({
  usernameOrEmail,
  password,
}: LoginParams) => {
  const response = await api.post(BACKEND + '/users/auth/login', {
    usernameOrEmail,
    password,
  });
  return response.data;
};

export const getUserToken2FA = async ({ userId, token2FA }: Login2FAParams) => {
  const response = await api.post(BACKEND + '/users/auth/2fa/login', {
    userId,
    token2FA,
  });
  return response.data;
};

export const getUserFromToken = async (token: string) => {
  const response = await api.get(
    BACKEND + `/users/auth/login/decode/token/${token}`
  );
  return response.data;
};

export const decodeAccessToken = async () => {
  const accessToken = getCookie('accessToken');

  if (!accessToken) return null;

  try {
    const userInfo = await getUserFromToken(accessToken);
    return userInfo;
  } catch (error) {
    removeCookie('accessToken');
    removeCookie('refreshToken');
    return null;
  }
};

export const validateWithAuthToken = async () => {
  const response = await api.get(BACKEND + '/users/auth/validate/token');
  return response.status === 200;
};
