import { BACKEND } from '@/constants';
import { fetchGet } from '../axios';
import { getQueries } from '@/utils';

export const searchVendors = async (searchTerm: string) => {
  const queries = getQueries({ searchTerm });
  const response = await fetchGet(`${BACKEND}/users/search` + queries);

  if (response.status !== 200) return null;

  return response.data;
};
