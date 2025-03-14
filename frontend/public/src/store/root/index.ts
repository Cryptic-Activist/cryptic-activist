import {
  useAppStore,
  useBlockchainStore,
  useCreateOfferStore,
  useCryptocurrenciesStore,
  useCryptocurrencyStore,
  useFiatStore,
  useFiatsStore,
  useNavigationBarStore,
  usePaymentMethodCategoriesStore,
  usePaymentMethodStore,
  usePaymentMethodsStore,
  useRegisterStore,
  useUserStore,
  useVerifyAccountStore,
} from '..';

import { IS_DEVELOPMENT } from '@/constants';
import { RootStore } from './types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useRootStore = create<RootStore>()(
  devtools(
    (set, get, store) => ({
      ...useAppStore(set, get, store),
      ...useBlockchainStore(set, get, store),
      ...useCryptocurrencyStore(set, get, store),
      ...useCryptocurrenciesStore(set, get, store),
      ...useFiatStore(set, get, store),
      ...useFiatsStore(set, get, store),
      ...usePaymentMethodStore(set, get, store),
      ...usePaymentMethodsStore(set, get, store),
      ...usePaymentMethodCategoriesStore(set, get, store),
      ...useNavigationBarStore(set, get, store),
      ...useUserStore(set, get, store),
      ...useRegisterStore(set, get, store),
      ...useCreateOfferStore(set, get, store),
      ...useVerifyAccountStore(set, get, store),
    }),
    {
      name: 'RootStore',
      enabled: IS_DEVELOPMENT,
      serialize: {
        replacer: (_key: any, value: any) => {
          if (typeof value === 'bigint') return value.toString();
          return value;
        },
      },
    }
  )
);
