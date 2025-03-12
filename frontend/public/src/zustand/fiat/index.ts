import { FiatStore } from './types';
import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';

export const useFiatStore: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  FiatStore
> = (set, get) => ({
  fiat: {
    id: undefined,
    name: undefined,
    symbol: undefined,
    setFiatValue: (params, actionName = 'fiat/setValue') => {
      set(
        ({ fiat, ...rest }) => ({
          fiat: {
            id: params.id ?? fiat.id,
            name: params.name ?? fiat.name,
            symbol: params.symbol ?? fiat.symbol,
            ...fiat,
          },
          ...rest,
        }),
        false,
        actionName
      );
    },
    setFiat: (fiat) => {
      const setValue = get().fiat.setFiatValue;
      setValue(fiat, 'fiat/setFiat');
    },
  },
});
