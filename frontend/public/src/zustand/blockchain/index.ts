import { BlockchainStore } from './types';
import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';

export const useBlockchainStore: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  BlockchainStore
> = (set, get) => ({
  blockchain: {
    account: undefined,
    balance: undefined,
    chain: undefined,
    connector: undefined,
    provider: undefined,
    wallet: undefined,
    setBlockchainValue: (params) => {
      const {
        blockchain: {
          account,
          balance,
          chain,
          connector,
          provider,
          wallet,
          ...restBlockchain
        },
        ...rest
      } = get();
      set(
        {
          blockchain: {
            account: params.account ?? account,
            balance: params.balance ?? balance,
            chain: params.chain ?? chain,
            connector: params.connector ?? connector,
            provider: params.provider ?? provider,
            wallet: params.wallet ?? wallet,
            ...restBlockchain,
          },
          ...rest,
        },
        false,
        'blockchain/setValue'
      );
    },
    resetBlockchain: () => {
      const setValue = get().blockchain.setBlockchainValue;
      setValue({
        account: undefined,
        balance: undefined,
        chain: undefined,
        connector: undefined,
        provider: undefined,
        wallet: undefined,
      });
    },
  },
});
