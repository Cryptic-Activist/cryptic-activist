import { BACKEND } from '@/constants';
import { fetchGet } from '@/services/axios';
import { getCookie } from '@/utils';

export const getNationalities = async () => {
  const accessToken = getCookie('accessToken');
  try {
    const response = await fetchGet(BACKEND + '/users/kyc/nationalities', {
      Authorization: `Bearer ${accessToken}`,
    });

    console.log({ response });
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
