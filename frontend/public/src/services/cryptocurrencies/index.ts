import { BACKEND } from '@/constants';
import { fetchGet } from '@/services/axios';
import { getQueries } from '@/utils';

export const fetchCryptocurrencies = async (chainId: number) => {
  try {
    const queries = getQueries({ chainId });
    const response = await fetchGet(BACKEND + '/cryptocurrencies' + queries);

    if (response.status !== 200) {
      return null;
    }

    return response.data;
  } catch (_error) {
    return null;
  }
};
