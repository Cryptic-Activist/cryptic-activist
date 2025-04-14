import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';
import { TradeStore } from './types';

export const useTradeSlice: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  TradeStore
> = (set, get) => ({
  trade: {
    cryptocurrency: undefined,
    cryptocurrencyAmount: undefined,
    endedAt: undefined,
    escrowReleaseDate: undefined,
    expiredAt: undefined,
    fiat: undefined,
    fiatAmount: undefined,
    id: undefined,
    offer: undefined,
    paid: undefined,
    paymentMethod: undefined,
    paymentReceipt: undefined,
    status: undefined,
    trader: undefined,
    vendor: undefined,
    chat: undefined,
    setTradeValue: (params, actionName = 'trade/setValue') => {
      set(
        ({ trade }) => {
          return {
            trade: {
              ...trade,
              cryptocurrency: params.cryptocurrency ?? trade.cryptocurrency,
              cryptocurrencyAmount:
                params.cryptocurrencyAmount ?? trade.cryptocurrencyAmount,
              endedAt: params.endedAt ?? trade.endedAt,
              escrowReleaseDate:
                params.escrowReleaseDate ?? trade.escrowReleaseDate,
              expiredAt: params.expiredAt ?? trade.expiredAt,
              fiat: params.fiat ?? trade.fiat,
              fiatAmount: params.fiatAmount ?? trade.fiatAmount,
              id: params.id ?? trade.id,
              offer: params.offer ?? trade.offer,
              paid: params.paid ?? trade.paid,
              paymentConfirmed:
                params.paymentConfirmed ?? trade.paymentConfirmed,
              paymentMethod: params.paymentMethod ?? trade.paymentMethod,
              paymentReceipt: params.paymentReceipt ?? trade.paymentReceipt,
              status: params.status ?? trade.status,
              trader: params.trader ?? trade.trader,
              vendor: params.vendor ?? trade.vendor,
              chat: params.chat ?? trade.chat,
              traderWalletAddress:
                params.traderWalletAddress ?? trade.traderWalletAddress,
              vendorWalletAddress:
                params.vendorWalletAddress ?? trade.vendorWalletAddress,
            },
          };
        },
        false,
        actionName
      );
    },
    setTrade: (trade) => {
      const setValue = get().trade.setTradeValue;

      setValue(trade, 'trade/setTrade');
    },
    resetTrade: () => {
      const setValue = get().trade.setTradeValue;

      setValue({}, 'trade/resetTrade');
    },
  },
});
