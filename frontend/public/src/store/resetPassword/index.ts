import { ResetPasswordStore } from './types';
import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';

export const useResetPasswordSlice: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  ResetPasswordStore
> = (set, get) => ({
  resetPassword: {
    token: undefined,
    setResetPasswordValue: (params, actionName = 'resetPassword/setValue') => {
      set(
        ({ resetPassword }) => ({
          resetPassword: {
            ...resetPassword,
            token: params.token ?? resetPassword.token,
          },
        }),
        false,
        actionName
      );
    },
    setResetPassword: (resetPassword) => {
      const setValue = get().resetPassword.setResetPasswordValue;
      setValue(resetPassword, 'resetPassword/setResetPassword');
    },
    resetResetPassword: () => {
      set(
        ({ resetPassword }) => ({
          resetPassword: {
            ...resetPassword,
            token: undefined,
          },
        }),
        false,
        'resetPassword/resetResetPassword'
      );
    },
  },
});
