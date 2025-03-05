import type {
  SetPrivateKeysParam,
  SetUsernameParam,
  SubmitVerifyPrivateKeysParams,
  VerifyAccountSetter,
  VerifyAccountState,
} from './types';

import { BACKEND } from '@/constants';
import { fetchPost } from '@/services/axios';
import { map } from 'nanostores';

export const $verifyAccount = map<VerifyAccountState>();

const setter = ({
  privateKeys,
  privateKeysArray,
  username,
  isSubmitted,
}: VerifyAccountSetter) => {
  const verifyAccount = $verifyAccount.get();

  $verifyAccount.set({
    username: username ?? verifyAccount.username,
    privateKeys: privateKeys ?? verifyAccount.privateKeys,
    privateKeysArray: privateKeysArray ?? verifyAccount.privateKeysArray,
    isSubmitted: isSubmitted ?? verifyAccount.isSubmitted,
  });
};

export const setUsername = async ({ username }: SetUsernameParam) => {
  setter({
    username,
  });
};

export const setPrivateKeys = async ({ privateKeys }: SetPrivateKeysParam) => {
  setter({
    privateKeys,
  });
};

export const setPrivateKeysArray = async () => {
  setter({
    privateKeysArray: Array(12).fill(''),
  });
};

export const submitVerifyPrivateKeys = async (
  params: SubmitVerifyPrivateKeysParams
) => {
  const response = await fetchPost(
    BACKEND + '/users/auth/private-keys/verify',
    { ...params }
  );

  if (response.status !== 200) {
    setter({ isSubmitted: false });
    return false;
  }

  setter({ isSubmitted: true });
  return true;
};
