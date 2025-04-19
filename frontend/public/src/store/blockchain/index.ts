import { BlockchainStore } from './types';
import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';

export const useBlockchainSlice: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  BlockchainStore
> = (set, _get) => ({
  blockchain: {
    account: undefined,
    balance: undefined,
    chain: undefined,
    wallet: undefined,
    setBlockchainValue: (params, actionName = 'blockchain/setValue') => {
      set(
        ({ blockchain }) => ({
          blockchain: {
            ...blockchain,
            account: params.account ?? blockchain.account,
            balance: params.balance ?? blockchain.balance,
            chain: params.chain ?? blockchain.chain,
            wallet: params.wallet ?? blockchain.wallet,
          },
        }),
        false,
        actionName
      );
    },
    resetBlockchain: () => {
      set(
        ({ blockchain }) => ({
          blockchain: {
            ...blockchain,
            account: undefined,
            balance: undefined,
            chain: undefined,
            wallet: undefined,
          },
        }),
        false,
        'blockchain/resetBlockchain'
      );
    },
  },
});
