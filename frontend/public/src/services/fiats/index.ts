import { BACKEND } from '@/constants';
import { fetchGet } from '@/services/axios';

export const fetchFiats = async () => {
  try {
    const response = await fetchGet(`${BACKEND}/fiats`);

    if (response.status !== 200) {
      return null;
    }

    return response.data;
  } catch (error) {
    return null;
  }
};
