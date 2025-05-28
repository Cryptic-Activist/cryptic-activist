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
    totalPages: 1,
    currentPage: 1,
    pageSize: 10,
    setTradeValue: (params, actionName = 'trades/setValue') => {
      set(
        ({ trades }) => ({
          trades: {
            ...trades,
            data: params.data ?? trades.data,
            totalPages: params.totalPages ?? trades.totalPages,
            currentPage: params.currentPage ?? trades.currentPage,
            pageSize: params.pageSize ?? trades.pageSize,
          },
        }),
        false,
        actionName
      );
    },
    resetTrades: () => {
      const setValue = get().trades.setTradeValue;

      setValue(
        { data: [], currentPage: 1, pageSize: 1, totalPages: 10 },
        'trades/resetTrades'
      );
    },
  },
});
