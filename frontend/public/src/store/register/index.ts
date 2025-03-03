import { map } from 'nanostores';

import type { RegisterSetter, RegisterState } from './types';

export const $register = map<RegisterState>();

const setter = ({ privateKeys }: RegisterSetter) => {
  const register = $register.get();

  $register.set({
    privateKeys: privateKeys ?? register.privateKeys,
  });
};

export const setRegisterPrivateKeys = async (privateKeys: string[]) => {
  setter({
    privateKeys,
  });
};
