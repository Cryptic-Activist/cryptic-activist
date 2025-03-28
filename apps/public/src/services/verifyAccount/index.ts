import { BACKEND } from '@/constants';
import { SubmitVerifyPrivateKeysParams } from '@/store/verifyAccount/types';
import { fetchPost } from '../axios';

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
