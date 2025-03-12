import { CryptocurrencyStore } from './types';
import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';

export const useCryptocurrencyStore: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  CryptocurrencyStore
> = (set, get) => ({
  cryptocurrency: {
    coingeckoId: undefined,
    id: undefined,
    name: undefined,
    symbol: undefined,
    setCryptocurrencyValue: (params) => {
      const {
        cryptocurrency: {
          coingeckoId,
          id,
          name,
          symbol,
          ...restCryptocurrency
        },
        ...rest
      } = get();
      set(
        {
          cryptocurrency: {
            coingeckoId: params.coingeckoId ?? coingeckoId,
            id: params.id ?? id,
            name: params.name ?? name,
            symbol: params.symbol ?? symbol,
            ...restCryptocurrency,
          },
          ...rest,
        },
        false,
        'blockchain/setValue'
      );
    },
    getCryptocurrency: async () => {
      // const cryptocurrencies = await fetchCryptocurrencies();
      // if (!cryptocurrencies) {
      //   set({ cryptocurrency:  });
      // }
    },
  },
});
