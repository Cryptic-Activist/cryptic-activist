import { fetchGet, fetchPost } from '@/services/axios';

import { BACKEND } from '@/constants';
import { SubmitKYCParams } from './types';
import { getCookie } from '@/utils';

export const getNationalities = async () => {
  const accessToken = getCookie('accessToken');
  try {
    const response = await fetchGet(BACKEND + '/users/kyc/nationalities', {
      Authorization: `Bearer ${accessToken}`,
    });

    if (response.status !== 200) return null;

    return response.data;
  } catch (error: any) {
    if (error.status === (400 as number)) {
      return error.response.data;
    }
  }
};

export const getDocumentTypes = async () => {
  const accessToken = getCookie('accessToken');
  try {
    const response = await fetchGet(BACKEND + '/users/kyc/document/types', {
      Authorization: `Bearer ${accessToken}`,
    });
    if (response.status !== 200) return null;

    return response.data;
  } catch (error: any) {
    if (error.status === (400 as number)) {
      return error.response.data;
    }
  }
};

export const submitKYC = async (params: SubmitKYCParams) => {
  const accessToken = getCookie('accessToken');
  try {
    const response = await fetchPost(
      BACKEND + '/users/kyc/submit',
      {
        ...params,
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
