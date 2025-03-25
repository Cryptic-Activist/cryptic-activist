import { CryptocurrenciesStore } from './types';
import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';
import { fetchCryptocurrencies } from '@/services/cryptocurrencies';

export const useCryptocurrenciesSlice: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  CryptocurrenciesStore
> = (set, get) => ({
  cryptocurrencies: {
    data: undefined,
    setCryptocurrenciesValue: (
      params,
      actionName = 'cryptocurrencies/setValue'
    ) => {
      set(
        ({ cryptocurrencies }) => ({
          cryptocurrencies: {
            ...cryptocurrencies,
            data: params.data ?? cryptocurrencies.data,
          },
        }),
        false,
        actionName
      );
    },
    getCryptocurrencies: async () => {
      const cryptocurrencies = await fetchCryptocurrencies();
      const setValue = get().cryptocurrencies.setCryptocurrenciesValue;

      setValue(
        { data: cryptocurrencies },
        'cryptocurrencies/setCryptocurrencies'
      );
    },
  },
});
