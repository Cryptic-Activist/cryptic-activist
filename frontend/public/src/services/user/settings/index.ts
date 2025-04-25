import { AddSpokenLanguagesParams, RemoveSpokenLanguagesParams } from './types';

import { BACKEND } from '@/constants';
import { fetchPut } from '@/services/axios';
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
    console.log({ error });
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
