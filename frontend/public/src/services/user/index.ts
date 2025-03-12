import {
  GetUserInfoReturn,
  GetUserTokenResponse,
  LoginUserParams,
} from './types';
import { fetchGet, fetchPost } from '../axios';
import {
  getBearerToken,
  getLocalStorage,
  removeCookie,
  removeLocalStorage,
  setCookie,
  setLocalStorage,
} from '@/utils';
import { resetUserInfo, setUserInfo } from '@/store';

import { BACKEND } from '@/constants';

const getUserToken = async ({
  password,
  username,
}: LoginUserParams): Promise<GetUserTokenResponse | null> => {
  const response = await fetchPost(BACKEND + '/users/auth/login', {
    password,
    username,
  });

  if (response.status !== 200) return null;

  return response.data;
};

const getUserInfoFromToken = async (
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
    const accessToken = getLocalStorage('accessToken');

    if (!accessToken) return null;

    const userInfo = await getUserInfoFromToken(accessToken);

    if (!userInfo) {
      removeLocalStorage('accessToken');
      removeLocalStorage('refreshToken');
      throw Error('Unable to decode token');
    }

    setUserInfo(userInfo);
    return userInfo;
  } catch (err) {
    removeLocalStorage('accessToken');
    removeLocalStorage('refreshToken');

    throw Error('Unable to decode token');
  }
};

export const login = async (userData: LoginUserParams) => {
  try {
    const tokens = await getUserToken(userData);

    if (!tokens) {
      throw Error('Unable to login');
    }
    setCookie({
      name: 'accessToken',
      value: tokens.accessToken,
      expiresInHours: 1,
    });
    setCookie({
      name: 'refreshToken',
      value: tokens.refreshToken,
      expiresInHours: 2,
    });
    setLocalStorage('accessToken', tokens.accessToken);
    setLocalStorage('refreshToken', tokens.refreshToken);

    const userInfo = await getUserInfoFromToken(tokens.accessToken);

    if (!userInfo) {
      removeLocalStorage('accessToken');
      removeLocalStorage('refreshToken');
      throw Error('Unable to login');
    }

    setUserInfo(userInfo);
    return true;
  } catch (err) {
    removeLocalStorage('accessToken');
    removeLocalStorage('refreshToken');

    throw Error('Unable to login');
  }
};

export const logout = () => {
  removeLocalStorage('accessToken');
  removeLocalStorage('refreshToken');
  removeCookie('accessToken');
  removeCookie('refreshToken');
  resetUserInfo();
};
