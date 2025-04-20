import {
  UserResetPasswordParams,
  UserResetPasswordRequestParams,
} from './types';
import { fetchGet, fetchPost } from '@/services/axios';

import { BACKEND } from '@/constants';

export const onSubmitUserResetPasswordRequest = async (
  params: UserResetPasswordRequestParams
) => {
  const response = await fetchPost(BACKEND + '/users/auth/password/reset', {
    ...params,
  });

  if (response.status !== 200) {
    return false;
  }

  return response.data;
};

export const validatePasswordResetToken = async (token: string) => {
  const response = await fetchGet(
    BACKEND + '/users/auth/password/reset/verify/' + token
  );

  console.log({ response });

  if (response.status !== 200) {
    return response.data.errors;
  }

  return response.data;
};

export const onSubmitUserResetPassword = async ({
  token,
  ...params
}: UserResetPasswordParams) => {
  const response = await fetchPost(
    BACKEND + '/users/auth/password/reset/' + token,
    {
      ...params,
    }
  );

  if (response.status !== 200) {
    return false;
  }

  return response.data;
};
