import { USER_API } from '@/constants';
import { fetchGet, fetchPost } from '@/services/axios';
import { UserRegistrationParams } from './types';

export const getRandomCredentials = async () => {
  const response = await fetchGet(USER_API + '/users/random/credentials');

  if (response.status !== 200) {
    return;
  }

  return response.data;
};

export const onSubmitUserRegistration = async (
  params: UserRegistrationParams
) => {
  const response = await fetchPost(USER_API + '/users/auth/register', {
    ...params,
  });

  if (response.status !== 201) {
    return false;
  }

  return response.data;
};
