import { ChainStore } from './types';
import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';

export const useChainSlice: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  ChainStore
> = (set, get) => ({
  chain: {
    coingeckoId: undefined,
    id: undefined,
    name: undefined,
    symbol: undefined,
    chainId: undefined,
    logoUrl: undefined,
    setChainValue: (params, actionName = 'chain/setValue') => {
      set(
        ({ chain }) => ({
          chain: {
            ...chain,
            coingeckoId: params.coingeckoId ?? chain.coingeckoId,
            id: params.id ?? chain.id,
            name: params.name ?? chain.name,
            symbol: params.symbol ?? chain.symbol,
            logoUrl: params.logoUrl ?? chain.logoUrl,
            chainId: params.chainId ?? chain.chainId,
          },
        }),
        false,
        actionName
      );
    },
    setChain: (chain) => {
      const setValue = get().chain.setChainValue;
      setValue(chain, 'chain/setChain');
    },
  },
});
