import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';
import { VerifyAccountStore } from './types';
import { submitPrivateKeysVerification } from '@/services/verifyAccount';

export const useVerifyAccountStore: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  VerifyAccountStore
> = (set, get) => ({
  verifyAccount: {
    id: undefined,
    name: undefined,

    setVerifyAccountValue: (params, actionName = 'verifyAccount/setValue') => {
      set(
        ({ verifyAccount }) => ({
          verifyAccount: {
            ...verifyAccount,
            username: params.username ?? verifyAccount.username,
            privateKeys: params.privateKeys ?? verifyAccount.privateKeys,
            privateKeysArray:
              params.privateKeysArray ?? verifyAccount.privateKeysArray,
            isSubmitted: params.isSubmitted ?? verifyAccount.isSubmitted,
          },
        }),
        false,
        actionName
      );
    },
    setUsername: (param) => {
      const setValue = get().verifyAccount.setVerifyAccountValue;
      setValue(param, 'verifyAccount/setUsername');
    },
    setPrivateKeys: (param) => {
      const setValue = get().verifyAccount.setVerifyAccountValue;
      setValue(param, 'verifyAccount/setPrivateKeys');
    },
    setPrivateKeysArray: () => {
      const setValue = get().verifyAccount.setVerifyAccountValue;
      setValue(
        { privateKeysArray: Array(12).fill('') },
        'verifyAccount/setPrivateKeysArray'
      );
    },
    verifyPrivateKeys: async (params) => {
      const submitted = await submitPrivateKeysVerification(params);
      const setValue = get().verifyAccount.setVerifyAccountValue;

      if (!submitted) {
        setValue({ isSubmitted: false }, 'verifyAccount/verifyPrivateKeys');
        return false;
      }

      setValue({ isSubmitted: true }, 'verifyAccount/verifyPrivateKeys');
      return true;
    },
  },
});
