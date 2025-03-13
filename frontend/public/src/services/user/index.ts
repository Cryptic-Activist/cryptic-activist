import { GetUserInfoReturn, GetUserTokenResponse, LoginParams } from './types';
import { fetchGet, fetchPost } from '../axios';
import { getBearerToken, getLocalStorage, removeLocalStorage } from '@/utils';

import { BACKEND } from '@/constants';

export const getUserToken = async ({
  password,
  username,
}: LoginParams): Promise<GetUserTokenResponse | null> => {
  const response = await fetchPost(BACKEND + '/users/auth/login', {
    password,
    username,
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
      Authorization: getBearerToken(token),
    }
  );

  if (response.status !== 200) return null;

  return response.data;
};

export const decodeAccessToken = async () => {
  try {
    console.log('before access token...');
    const accessToken = getLocalStorage('accessToken');
    console.log({ accessToken });

    if (!accessToken) return null;

    const userInfo = await getUserFromToken(accessToken);

    if (!userInfo) {
      removeLocalStorage('accessToken');
      removeLocalStorage('refreshToken');
      throw Error('Unable to decode token');
    }

    return userInfo;
  } catch (err) {
    removeLocalStorage('accessToken');
    removeLocalStorage('refreshToken');

    throw Error('Unable to decode token');
  }
};
