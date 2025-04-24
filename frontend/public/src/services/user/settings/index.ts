import { AddSpokenLanguagesParams, RemoveSpokenLanguagesParams } from './types';

import { BACKEND } from '@/constants';
import { fetchPut } from '@/services/axios';
import { getCookie } from '@/utils';

export const addSpokenLanguage = async ({
  language,
  userId,
}: AddSpokenLanguagesParams) => {
  const accessToken = getCookie('accessToken');
  const response = await fetchPut(
    BACKEND + '/users/' + userId + '/settings/language/add',
    {
      language,
    },
    {
      Authorization: `Bearer ${accessToken}`,
    }
  );

  if (response.status !== 200) return null;

  return response.data;
};

export const removeSpokenLanguage = async ({
  languageId,
  userId,
}: RemoveSpokenLanguagesParams) => {
  const accessToken = getCookie('accessToken');
  const response = await fetchPut(
    BACKEND + '/users/' + userId + '/settings/language/add',
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
