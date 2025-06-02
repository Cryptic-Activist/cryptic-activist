import {
  AddSpokenLanguagesParams,
  RemoveSpokenLanguagesParams,
  UpdateEmailParams,
} from './types';
import { fetchGet, fetchPost, fetchPut } from '@/services/axios';

import { BACKEND } from '@/constants';
import { getCookie } from '@/utils';

export const addSpokenLanguage = async ({
  language,
  userId,
}: AddSpokenLanguagesParams) => {
  const accessToken = getCookie('accessToken');
  try {
    const response = await fetchPut(
      BACKEND + '/users/settings/' + userId + '/language/add',
      {
        language,
      },
      {
        Authorization: `Bearer ${accessToken}`,
      }
    );
    if (response.status !== 200) return null;

    return response.data;
  } catch (error: any) {
    if (error.status === (400 as number)) {
      return error.response.data;
    }
  }
};

export const removeSpokenLanguage = async ({
  languageId,
  userId,
}: RemoveSpokenLanguagesParams) => {
  const accessToken = getCookie('accessToken');
  const response = await fetchPut(
    BACKEND + '/users/settings/' + userId + '/language/remove',
    {
      languageId,
    },
    {
      Authorization: `Bearer ${accessToken}`,
    }
  );

  if (response.status !== 200) return null;

  return response.data;
};

export const updateEmailRequest = async ({
  userId,
  email,
}: UpdateEmailParams) => {
  const accessToken = getCookie('accessToken');
  const response = await fetchPost(
    BACKEND + '/users/settings/' + userId + '/email/request',
    {
      email,
    },
    {
      Authorization: `Bearer ${accessToken}`,
    }
  );

  if (response.status !== 200) return null;

  return response.data;
};

export const updateEmail = async (token: string) => {
  const accessToken = getCookie('accessToken');
  const response = await fetchGet(
    BACKEND + '/users/settings/email/change/' + token,
    {
      Authorization: `Bearer ${accessToken}`,
    }
  );

  if (response.status !== 200) return null;

  return response.data;
};

export const disable2FA = async (userId: string) => {
  const accessToken = getCookie('accessToken');
  console.log({ accessToken });
  const response = await fetchPut(
    BACKEND + '/users/auth/2fa/disable/' + userId,
    {},
    {
      Authorization: `Bearer ${accessToken}`,
    }
  );

  if (response.status !== 200) return null;

  return response.data;
};
