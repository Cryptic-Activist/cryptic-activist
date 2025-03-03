import { CRYPTOCURRENCY_API } from '@/constants';
import { AxiosResponse, fetchGet } from '@/services/axios';
import { getQueries } from '@/utils';

export const fetchCurrentPrice = async (
  id: string,
  fiatSymbol: string
): Promise<AxiosResponse | null> => {
  const query = getQueries({ id, fiatSymbol });
  const response = await fetchGet(
    CRYPTOCURRENCY_API + '/cryptocurrency/price' + query
  );

  if (response.status !== 200) return null;

  return response;
};
