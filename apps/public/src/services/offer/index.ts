import { BACKEND } from '@/constants';
import { fetchGet } from '@/services/axios';
import { getQueries } from '@/utils';

export const getOffer = async (id: string) => {
  const queries = getQueries({
    associations: 'cryptocurrency,fiat,paymentMethod,vendor',
  });
  const response = await fetchGet(`${BACKEND}/offers/offer/` + id + queries);

  if (response.status !== 200) return null;

  return response.data;
};
