import { BACKEND } from '@/constants';
import { fetchGet } from '@/services/axios';
import { getQueries } from '@/utils';

export const fetchCurrentPrice = async (id: string, fiatSymbol: string) => {
  const query = getQueries({ id, fiatSymbol });
  const response = await fetchGet(
    BACKEND + '/cryptocurrencies/cryptocurrency/price' + query
  );

  if (response.status !== 200) return null;

  return response.data;
};
