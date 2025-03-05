import { AxiosResponse, fetchGet } from '@/services/axios';

import { BACKEND } from '@/constants';

export const fetchOffers = async (): Promise<AxiosResponse | null> => {
  const response = await fetchGet(`${BACKEND}/offers`);

  if (response.status !== 200) {
    return null;
  }

  return response;
};
