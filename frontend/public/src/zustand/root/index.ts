import {
  useAppStore,
  useBlockchainStore,
  useCreateOfferStore,
  useCryptocurrencyStore,
  useFiatStore,
  useNavigationBarStore,
  usePaymentMethodStore,
  useRegisterStore,
  useUserStore,
} from '../';

import { IS_DEVELOPMENT } from '@/constants';
import { RootStore } from './types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// import { immer } from 'zustand/middleware/immer';

export const useRootStore = create<RootStore>()(
  devtools(
    (set, get, store) => ({
      ...useAppStore(set, get, store),
      ...useBlockchainStore(set, get, store),
      ...useCryptocurrencyStore(set, get, store),
      ...useFiatStore(set, get, store),
      ...usePaymentMethodStore(set, get, store),
      ...useNavigationBarStore(set, get, store),
      ...useUserStore(set, get, store),
      ...useRegisterStore(set, get, store),
      ...useCreateOfferStore(set, get, store),
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
