import { fetchGet, fetchPost } from '@/services/axios';

import { BACKEND } from '@/constants';
import { UserRegistrationParams } from './types';

export const getRandomCredentials = async () => {
  const response = await fetchGet(BACKEND + '/users/random/credentials');

  if (response.status !== 200) {
    return;
  }

  return response.data;
};

export const onSubmitUserRegistration = async (
  params: UserRegistrationParams
) => {
  const response = await fetchPost(BACKEND + '/users/auth/register', {
    ...params,
  });

  if (response.status !== 201) {
    return false;
  }

  return response.data;
};
