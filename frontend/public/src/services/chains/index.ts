import { BACKEND } from '@/constants';
import { fetchGet } from '@/services/axios';

export const fetchChains = async () => {
  try {
    const response = await fetchGet(BACKEND + '/cryptocurrencies/chains');

    if (response.status !== 200) {
      return null;
    }

    return response.data;
  } catch (_error) {
    return null;
  }
};
