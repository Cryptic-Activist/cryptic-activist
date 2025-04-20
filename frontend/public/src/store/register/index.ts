import { RegisterStore } from './types';
import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';

export const useRegisterSlice: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  RegisterStore
> = (set, get) => ({
  register: {
    privateKeys: undefined,
    firstName: undefined,
    lastName: undefined,
    username: undefined,
    setRegisterValue: (params, actionName = 'register/setValue') => {
      set(
        ({ register }) => ({
          register: {
            ...register,
            privateKeys: params.privateKeys ?? register.privateKeys,
            firstName: params.firstName ?? register.firstName,
            lastName: params.lastName ?? register.lastName,
            username: params.username ?? register.username,
            email: params.email ?? register.email,
          },
        }),
        false,
        actionName
      );
    },
    setPrivateKeys: (privateKeys: string[]) => {
      const setValue = get().register.setRegisterValue;
      setValue({ privateKeys }, 'register/setRegister');
    },
    resetPrivateKeys: () => {
      set(
        ({ register }) => ({
          register: {
            ...register,
            privateKeys: undefined,
          },
        }),
        false,
        'register/resetPrivateKey'
      );
    },
  },
});
