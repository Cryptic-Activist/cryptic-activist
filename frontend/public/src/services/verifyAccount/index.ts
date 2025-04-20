import { fetchGet, fetchPost } from '../axios';

import { BACKEND } from '@/constants';
import { SubmitVerifyPrivateKeysParams } from '@/store/verifyAccount/types';

export const submitPrivateKeysVerification = async (
  params: SubmitVerifyPrivateKeysParams
) => {
  const response = await fetchPost(
    BACKEND + '/users/auth/private-keys/verify',
    { ...params }
  );

  if (response.status !== 200) {
    return null;
  }

  return response.data;
};

export const validateAccountVerificationToken = async (token: string) => {
  const response = await fetchGet(BACKEND + '/users/auth/verify/' + token);

  if (response.status !== 200) {
    return null;
  }

  return response.data;
};
