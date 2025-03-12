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
    setCryptocurrencyValue: (
      params,
      actionName = 'cryptocurrency/setValue'
    ) => {
      set(
        ({ cryptocurrency, ...rest }) => ({
          cryptocurrency: {
            coingeckoId: params.coingeckoId ?? cryptocurrency.coingeckoId,
            id: params.id ?? cryptocurrency.id,
            name: params.name ?? cryptocurrency.name,
            symbol: params.symbol ?? cryptocurrency.symbol,
            ...cryptocurrency,
          },
          ...rest,
        }),
        false,
        actionName
      );
    },
    setCryptocurrency: (cryptocurrency) => {
      const setValue = get().cryptocurrency.setCryptocurrencyValue;
      setValue(cryptocurrency, 'cryptocurrency/setCryptocurrency');
    },
  },
});
