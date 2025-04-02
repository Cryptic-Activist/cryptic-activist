import {
  getLocalStorage,
  removeCookie,
  removeLocalStorage,
  setCookie,
  setLocalStorage,
} from '@/utils';
import { getUserFromToken, getUserToken } from '@/services/user';

import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';
import { UserStore } from './types';

export const useUserSlice: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  UserStore
> = (set, get) => ({
  user: {
    id: undefined,
    names: undefined,
    languages: undefined,
    profileColor: undefined,
    username: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    setUserValue: (params, actionName = 'user/setValue') => {
      set(
        ({ user }) => {
          const languages = params.userLanguage?.map((language) => ({
            id: language.language.id,
            name: language.language.name,
          }));
          return {
            user: {
              ...user,
              id: params.id ?? user.id,
              languages: languages ?? user.languages,
              names: params.names ?? user.names,
              profileColor: params.profileColor ?? user.profileColor,
              username: params.username ?? user.username,
              lastLoginAt: params.lastLoginAt ?? user.lastLoginAt,
              createdAt: params.createdAt ?? user.createdAt,
              updatedAt: params.updatedAt ?? user.updatedAt,
            },
          };
        },
        false,
        actionName
      );
    },
    setUser: (user) => {
      const setValue = get().user.setUserValue;
      setValue(user, 'user/setUser');
    },
    resetUser: () => {
      set(
        ({ user }) => ({
          user: {
            ...user,
            id: undefined,
            languages: undefined,
            names: undefined,
            profileColor: undefined,
            username: undefined,
            lastLoginAt: undefined,
            createdAt: undefined,
            updatedAt: undefined,
          },
        }),
        false,
        'user/resetUser'
      );
    },
    decodeAccessToken: async () => {
      try {
        const accessToken = getLocalStorage('accessToken');

        if (!accessToken) return null;

        const user = await getUserFromToken(accessToken);

        if (!user) {
          removeLocalStorage('accessToken');
          removeLocalStorage('refreshToken');
          return null;
        }

        const setValue = get().user.setUserValue;

        setValue(
          {
            id: user.id,
            names: {
              firstName: user.names.firstName,
              lastName: user.names.lastName,
            },
            languages: user.languages,
            profileColor: user.profileColor,
            username: user.username,
            lastLoginAt: user.lastLoginAt,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
          'user/decodeAccessToken'
        );
        return user;
      } catch (_err) {
        removeLocalStorage('accessToken');
        removeLocalStorage('refreshToken');
        return null;
      }
    },
    login: async (params) => {
      try {
        const tokens = await getUserToken(params);

        if (!tokens) {
          throw Error('Unable to login');
        }
        setCookie({
          name: 'accessToken',
          value: tokens.accessToken,
          expiresInHours: 1,
        });
        setCookie({
          name: 'refreshToken',
          value: tokens.refreshToken,
          expiresInHours: 2,
        });
        setLocalStorage('accessToken', tokens.accessToken);
        setLocalStorage('refreshToken', tokens.refreshToken);

        const user = await getUserFromToken(tokens.accessToken);

        if (!user) {
          removeLocalStorage('accessToken');
          removeLocalStorage('refreshToken');
          throw Error('Unable to login');
        }

        const setValue = get().user.setUserValue;

        setValue(
          {
            id: user.id,
            names: {
              firstName: user.names.firstName,
              lastName: user.names.lastName,
            },
            languages: user.languages,
            profileColor: user.profileColor,
            username: user.username,
            lastLoginAt: user.lastLoginAt,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
          'user/login'
        );
      } catch (_err) {
        removeLocalStorage('accessToken');
        removeLocalStorage('refreshToken');
        throw Error('Unable to login');
      }
    },
    logout: () => {
      removeLocalStorage('accessToken');
      removeLocalStorage('refreshToken');
      removeCookie('accessToken');
      removeCookie('refreshToken');

      const { resetUser } = get().user;

      resetUser();
    },
  },
});
