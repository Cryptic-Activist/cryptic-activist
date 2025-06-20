import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';
import { VendorStore } from './types';

export const useVendorSlice: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  VendorStore
> = (set, get) => ({
  vendor: {
    id: undefined,
    names: undefined,
    languages: undefined,
    profileColor: undefined,
    username: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    kyc: undefined,
    setVendorValue: (params, actionName = 'vendor/setValue') => {
      set(
        ({ vendor }) => {
          const languages = params.userLanguage?.map((language) => ({
            id: language.language.id,
            name: language.language.name,
          }));

          return {
            vendor: {
              ...vendor,
              id: params.id ?? vendor.id,
              languages: languages ?? vendor.languages,
              names: params.names ?? vendor.names,
              profileColor: params.profileColor ?? vendor.profileColor,
              username: params.username ?? vendor.username,
              lastLoginAt: params.lastLoginAt ?? vendor.lastLoginAt,
              createdAt: params.createdAt ?? vendor.createdAt,
              updatedAt: params.updatedAt ?? vendor.updatedAt,
              kyc: params.kyc ?? vendor.kyc,
              _count: params._count ?? vendor._count,
            },
          };
        },
        false,
        actionName
      );
    },
    setVendor: (vendor) => {
      const setValue = get().vendor.setVendorValue;
      setValue(vendor, 'vendor/setVendor');
    },
    resetVendor: () => {
      set(
        ({ vendor }) => ({
          vendor: {
            ...vendor,
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
            kyc: undefined,
          },
        }),
        false,
        'vendor/resetVendor'
      );
    },
  },
});
