import { ABIsStore } from './types';
import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';

export const useABIsSlice: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  ABIsStore
> = (set, get) => ({
  abis: {
    escrow: undefined,
    premium: undefined,
    setABIsValue: (params, actionName = 'abis/setValue') => {
      set(
        ({ abis }) => ({
          abis: {
            ...abis,
            escrow: params.escrow ?? abis.escrow,
            premium: params.premium ?? abis.premium,
          },
        }),
        false,
        actionName
      );
    },
    setEscrowABI: (abi) => {
      const setValue = get().abis.setABIsValue;
      setValue({ escrow: abi }, 'abis/setEscrowABI');
    },
    setPremiumABI: (abi) => {
      const setValue = get().abis.setABIsValue;
      setValue({ premium: abi }, 'abis/setPremiumABIs');
    },
  },
});
