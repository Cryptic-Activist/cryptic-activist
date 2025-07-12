import { TiersStore, Value } from './types';

import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';

export const useTiersSlice: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  TiersStore
> = (set, get) => ({
  tiers: {
    data: undefined,
    setTiersValue: (params, actionName = 'tiers/setValue') => {
      set(
        ({ tiers }) => ({
          tiers: {
            ...tiers,
            data: params.data ?? tiers.data,
          },
        }),
        false,
        actionName
      );
    },
    getTiers: async (tiers: Value) => {
      const setValue = get().tiers.setTiersValue;

      setValue({ data: tiers.data }, 'tiers/setTiers');
    },
  },
});
