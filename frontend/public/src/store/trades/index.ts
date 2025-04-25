import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';
import { TradesStore } from './types';

export const useTradesSlice: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  TradesStore
> = (set, get) => ({
  trades: {
    data: [],
    setTradeValue: (params, actionName = 'trade/setValue') => {
      set(
        ({ trades }) => {
          return {
            trades: {
              ...trades,
              data: params ?? trades.data,
            },
          };
        },
        false,
        actionName
      );
    },
    resetTrades: () => {
      const setValue = get().trade.setTradeValue;

      setValue({}, 'trade/resetTrade');
    },
  },
});
