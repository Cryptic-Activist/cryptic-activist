import { BACKEND } from '@/constants';
import { fetchGet } from '../axios';

export const getPublicSettings = async () => {
  const response = await fetchGet(BACKEND + '/settings/public');
  if (response.status !== 200) {
    return;
  }

  return response.data;
};
