import { BACKEND } from '@/constants';
import { fetchGet } from '../axios';

export const getAllTiers = async () => {
  const response = await fetchGet(BACKEND + '/tiers');
  if (response.status !== 200) {
    return;
  }

  return response.data;
};

export const getNextTier = async (userId: string) => {
  const response = await fetchGet(BACKEND + '/tiers/' + userId + '/next');
  if (response.status !== 200) {
    return;
  }

  return response.data;
};
