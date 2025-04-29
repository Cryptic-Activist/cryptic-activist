import { BACKEND } from '@/constants';
import { fetchGet } from '../axios';

export const getFeedbacks = async (userId: string) => {
  const response = await fetchGet(BACKEND + '/feedbacks/' + userId);

  if (response.status !== 200) {
    return false;
  }

  return response.data;
};
