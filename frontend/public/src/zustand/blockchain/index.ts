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
        ({
          blockchain: {
            account,
            balance,
            chain,
            connector,
            provider,
            wallet,
            ...blockchainRest
          },
          ...rest
        }) => ({
          ...rest,
          blockchain: {
            account: 'account' in params ? params.account : account,
            balance: 'balance' in params ? params.balance : balance,
            chain: 'chain' in params ? params.chain : chain,
            connector: 'connector' in params ? params.connector : connector,
            provider: 'provider' in params ? params.provider : provider,
            wallet: 'wallet' in params ? params.wallet : wallet,
            ...blockchainRest,
          },
        }),
        false,
        actionName
      );
    },
    resetBlockchain: () => {
      const setValue = get().blockchain.setBlockchainValue;
      setValue(
        {
          account: undefined,
          balance: undefined,
          chain: undefined,
          connector: undefined,
          provider: undefined,
          wallet: undefined,
        },
        'blockchain/resetBlockchain'
      );
    },
  },
});
