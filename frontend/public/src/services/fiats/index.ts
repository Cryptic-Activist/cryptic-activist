import { AxiosResponse, fetchGet } from '@/services/axios';

import { BACKEND } from '@/constants';

export const fetchFiats = async (): Promise<AxiosResponse | null> => {
  const response = await fetchGet(`${BACKEND}/fiats`);

  if (response.status !== 200) {
    return null;
  }

  return response;
};
