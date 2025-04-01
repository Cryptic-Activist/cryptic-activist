import { BACKEND } from '@/constants';
import { fetchGet } from '@/services/axios';

export const fetchCryptocurrencies = async () => {
  try {
    console.log({ testEndpoint: BACKEND + '/cryptocurrencies' });
    const response = await fetchGet(BACKEND + '/cryptocurrencies');

    if (response.status !== 200) {
      return null;
    }

    return response.data;
  } catch (_error) {
    return null;
  }
};
