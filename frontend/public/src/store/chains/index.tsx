import { ChainsStore } from './types';
import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';
import { fetchChains } from '@/services/chains';

export const useChainsSlice: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  ChainsStore
> = (set, get) => ({
  chains: {
    data: undefined,
    setChainsValue: (params, actionName = 'chains/setValue') => {
      set(
        ({ chains }) => ({
          chains: {
            ...chains,
            data: params.data ?? chains.data,
          },
        }),
        false,
        actionName
      );
    },
    getChains: async () => {
      const chains = await fetchChains();
      const setValue = get().chains.setChainsValue;

      setValue({ data: chains }, 'chains/setChains');
    },
  },
});
