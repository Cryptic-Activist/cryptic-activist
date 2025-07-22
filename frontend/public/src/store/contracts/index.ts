import { ContractsStore } from './types';
import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';

export const useContractsSlice: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  ContractsStore
> = (set, get) => ({
  contracts: {
    escrow: {
      erc20: undefined,
      native: undefined,
    },
    premium: undefined,
    setContractsValue: (params, actionName = 'contracts/setValue') => {
      set(
        ({ contracts }) => ({
          contracts: {
            ...contracts,
            escrow: {
              ...(contracts.escrow ?? {}),
              erc20: params.escrow?.erc20 ?? contracts.escrow?.erc20,
              native: params.escrow?.native ?? contracts.escrow?.native,
            },
            premium: params.premium ?? contracts.premium,
          },
        }),
        false,
        actionName
      );
    },
    setEscrowNativeContract: (contract) => {
      const setValue = get().contracts.setContractsValue;
      setValue(
        {
          escrow: {
            native: contract,
          },
        },
        'contracts/setEscrowContract'
      );
    },
    setEscrowERC20Contract: (contract) => {
      const setValue = get().contracts.setContractsValue;
      setValue(
        { escrow: { erc20: contract } },
        'contracts/setEscrowERC20Contract'
      );
    },
    setPremiumContract: (contract) => {
      const setValue = get().contracts.setContractsValue;
      setValue({ premium: contract }, 'contracts/setPremiumContracts');
    },
  },
});
