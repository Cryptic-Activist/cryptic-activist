import {
  getUserFromToken,
  getUserToken,
  getUserToken2FA,
} from '@/services/user';
import { removeCookie, setCookie } from '@/utils';

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
    email: undefined,
    languages: undefined,
    profileColor: undefined,
    username: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    twoFactorEnabled: undefined,
    referralCode: undefined,
    premiumPurchase: undefined,
    kyc: undefined,
    xp: undefined,
    tier: undefined,
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
              email: params.email ?? user.email,
              lastLoginAt: params.lastLoginAt ?? user.lastLoginAt,
              createdAt: params.createdAt ?? user.createdAt,
              updatedAt: params.updatedAt ?? user.updatedAt,
              twoFactorEnabled:
                params.twoFactorEnabled ?? user.twoFactorEnabled,
              referralCode: params.referralCode ?? user.referralCode,
              premiumPurchase: params.premiumPurchase ?? user.premiumPurchase,
              kyc: params.kyc ?? user.kyc,
              xp: params.xp ?? user.xp,
              tier: params.tier ?? user.tier,
              _count: params._count ?? user._count,
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
            email: undefined,
            names: undefined,
            profileColor: undefined,
            username: undefined,
            lastLoginAt: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            twoFactorEnabled: undefined,
            referralCode: undefined,
            premiumPurchase: undefined,
            kyc: undefined,
            xp: undefined,
            tier: undefined,
            _count: undefined,
          },
        }),
        false,
        'user/resetUser'
      );
    },
    login: async (params) => {
      try {
        const setValue = get().user.setUserValue;
        const tokens = await getUserToken(params);

        console.log({ tokens });

        if (!tokens) {
          throw Error('Unable to login');
        }

        if (tokens.twoFactorEnabled) {
          setValue(
            {
              twoFactorEnabled: tokens.twoFactorEnabled,
              id: tokens.userId,
            },
            'user/setTwoFactorEnabled'
          );
          return { twoFactorEnabled: tokens.twoFactorEnabled };
        }

        setCookie({
          name: 'accessToken',
          value: tokens.accessToken,
          expiresInHours: 1,
        });
        setCookie({
          name: 'refreshToken',
          value: tokens.refreshToken,
          expiresInHours: 7,
        });

        const user = await getUserFromToken(tokens.accessToken);

        if (!user) {
          removeCookie('accessToken');
          removeCookie('refreshToken');
          throw Error('Unable to login');
        }

        setValue(
          {
            id: user.id,
            names: {
              firstName: user.names.firstName,
              lastName: user.names.lastName,
            },
            userLanguage: user.userLanguage,
            profileColor: user.profileColor,
            username: user.username,
            email: user.email,
            lastLoginAt: user.lastLoginAt,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            referralCode: user.referralCode,
            xp: user.xp,
            twoFactorEnabled: user.twoFactorEnabled,
            tier: user.tier,
            kyc: user.kyc,
            _count: user._count,
          },
          'user/login'
        );
      } catch (error) {
        const { resetUser } = get().user;
        resetUser();
        removeCookie('accessToken');
        removeCookie('refreshToken');
        throw Error('Unable to login');
      }
    },
    login2FA: async (params) => {
      try {
        const setValue = get().user.setUserValue;
        const tokens = await getUserToken2FA(params);

        if (!tokens) {
          return false;
        }

        setCookie({
          name: 'accessToken',
          value: tokens.accessToken,
          expiresInHours: 1,
        });
        setCookie({
          name: 'refreshToken',
          value: tokens.refreshToken,
          expiresInHours: 7,
        });

        const user = await getUserFromToken(tokens.accessToken);

        if (!user) {
          removeCookie('accessToken');
          removeCookie('refreshToken');
          return false;
        }

        setValue(
          {
            id: user.id,
            names: {
              firstName: user.names.firstName,
              lastName: user.names.lastName,
            },
            userLanguage: user.userLanguage,
            profileColor: user.profileColor,
            username: user.username,
            email: user.email,
            lastLoginAt: user.lastLoginAt,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            kyc: user.kyc,
            _count: user._count,
          },
          'user/login2FA'
        );

        return true;
      } catch (error) {
        const { resetUser } = get().user;
        resetUser();
        removeCookie('accessToken');
        removeCookie('refreshToken');
        return false;
      }
    },
    logout: () => {
      removeCookie('accessToken');
      removeCookie('refreshToken');

      const { resetUser } = get().user;

      resetUser();
    },
  },
});
