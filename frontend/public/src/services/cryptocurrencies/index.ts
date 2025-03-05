import { AxiosResponse, fetchGet } from '@/services/axios';

import { BACKEND } from '@/constants';

export const fetchCryptocurrencies = async () => {
  try {
    const response = await fetchGet(BACKEND + '/cryptocurrencies');

    if (response.status !== 200) {
      return null;
    }

    return response.data;
  } catch (error) {
    return null;
  }
};
