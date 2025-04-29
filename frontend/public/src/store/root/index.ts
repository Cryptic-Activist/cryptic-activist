import { IS_DEVELOPMENT } from '@/constants';
import { RootStore } from './types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useAppSlice } from '@/store/app';
import { useBlockchainSlice } from '@/store/blockchain';
import { useCreateOfferSlice } from '@/store/createOffer';
import { useCryptocurrenciesSlice } from '@/store/cryptocurrencies';
import { useCryptocurrencySlice } from '@/store/cryptocurrency';
import { useFiatSlice } from '@/store/fiat';
import { useFiatsSlice } from '@/store/fiats';
import { useNavigationBarSlice } from '@/store/navigationBar';
import { useNotificationsSlice } from '@/store/notifications';
import { useOfferSlice } from '@/store/offer';
import { useOffersSlice } from '@/store/offers';
import { usePaymentMethodCategoriesSlice } from '@/store/paymentMethodCategories';
import { usePaymentMethodSlice } from '@/store/paymentMethod';
import { usePaymentMethodsSlice } from '@/store/paymentMethods';
import { useRegisterSlice } from '@/store/register';
import { useResetPasswordSlice } from '@/store/resetPassword';
import { useTradeDetailsSlice } from '@/store/tradeDetails';
import { useTradeSlice } from '@/store/trade';
import { useTradesSlice } from '@/store/trades';
import { useUserSlice } from '@/store/user';
import { useVendorSlice } from '@/store/vendor';
import { useVerifyAccountSlice } from '@/store/verifyAccount';

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
      ...useResetPasswordSlice(set, get, store),
      ...useCreateOfferSlice(set, get, store),
      ...useVerifyAccountSlice(set, get, store),
      ...useOffersSlice(set, get, store),
      ...useOfferSlice(set, get, store),
      ...useTradeSlice(set, get, store),
      ...useTradeDetailsSlice(set, get, store),
      ...useTradesSlice(set, get, store),
      ...useNotificationsSlice(set, get, store),
      ...useVendorSlice(set, get, store),
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
