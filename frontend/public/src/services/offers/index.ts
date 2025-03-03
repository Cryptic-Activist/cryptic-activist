import { OFFER_API } from '@/constants';
import { AxiosResponse, fetchGet } from '@/services/axios';

export const fetchOffers = async (): Promise<AxiosResponse | null> => {
  const response = await fetchGet(`${OFFER_API}/offers`);

  if (response.status !== 200) {
    return null;
  }

  return response;
};
