import {
  useAppSlice,
  useBlockchainSlice,
  useCreateOfferSlice,
  useCryptocurrenciesSlice,
  useCryptocurrencySlice,
  useFiatSlice,
  useFiatsSlice,
  useNavigationBarSlice,
  useOfferSlice,
  useOffersSlice,
  usePaymentMethodCategoriesSlice,
  usePaymentMethodSlice,
  usePaymentMethodsSlice,
  useRegisterSlice,
  useTradeSlice,
  useUserSlice,
  useVerifyAccountSlice,
} from '..';

import { IS_DEVELOPMENT } from '@/constants';
import { RootStore } from './types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useRootStore = create<RootStore>()(
  devtools(
    (set, get, store) => ({
      ...useAppSlice(set, get, store),
      ...useBlockchainSlice(set, get, store),
      ...useCryptocurrencySlice(set, get, store),
      ...useCryptocurrenciesSlice(set, get, store),
      ...useFiatSlice(set, get, store),
      ...useFiatsSlice(set, get, store),
      ...usePaymentMethodSlice(set, get, store),
      ...usePaymentMethodsSlice(set, get, store),
      ...usePaymentMethodCategoriesSlice(set, get, store),
      ...useNavigationBarSlice(set, get, store),
      ...useUserSlice(set, get, store),
      ...useRegisterSlice(set, get, store),
      ...useCreateOfferSlice(set, get, store),
      ...useVerifyAccountSlice(set, get, store),
      ...useOffersSlice(set, get, store),
      ...useOfferSlice(set, get, store),
      ...useTradeSlice(set, get, store),
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
