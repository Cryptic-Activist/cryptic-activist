import { BACKEND } from '@/constants';
import { fetchGet } from '../axios';

export const getBestVendors = async () => {
  const response = await fetchGet(`${BACKEND}/users/best-vendors`);

  if (response.status !== 200) return null;

  return response.data;
};
