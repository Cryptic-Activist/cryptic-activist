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
    setBlockchainValue: (params, actionName = 'blockchain/setValue') => {
      set(
        ({ blockchain, ...rest }) => ({
          blockchain: {
            account: params.account ?? blockchain.account,
            balance: params.balance ?? blockchain.balance,
            chain: params.chain ?? blockchain.chain,
            connector: params.connector ?? blockchain.connector,
            provider: params.provider ?? blockchain.provider,
            wallet: params.wallet ?? blockchain.wallet,
            ...blockchain,
          },
          ...rest,
        }),
        false,
        actionName
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
