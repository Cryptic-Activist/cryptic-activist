import { FIAT_API } from '@/constants';
import { AxiosResponse, fetchGet } from '@/services/axios';

export const fetchFiats = async (): Promise<AxiosResponse | null> => {
  const response = await fetchGet(`${FIAT_API}/fiats`);

  if (response.status !== 200) {
    return null;
  }

  return response;
};
