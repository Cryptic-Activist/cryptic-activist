import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';
import { TradeDetailsStore } from './types';

export const useTradeDetailsSlice: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  TradeDetailsStore
> = (set, get) => ({
  tradeDetails: {
    id: undefined,
    cryptocurrency: undefined,
    cryptocurrencyAmount: undefined,
    endedAt: undefined,
    escrowReleaseDate: undefined,
    expiredAt: undefined,
    fiat: undefined,
    fiatAmount: undefined,
    offer: undefined,
    paid: undefined,
    paymentMethod: undefined,
    paymentDetails: undefined,
    paymentReceipt: undefined,
    status: undefined,
    trader: undefined,
    vendor: undefined,
    chat: undefined,
    setTradeDetailsValue: (params, actionName = 'tradeDetails/setValue') => {
      set(
        ({ tradeDetails }) => {
          return {
            tradeDetails: {
              ...tradeDetails,
              cryptocurrency:
                params.cryptocurrency ?? tradeDetails.cryptocurrency,
              cryptocurrencyAmount:
                params.cryptocurrencyAmount ??
                tradeDetails.cryptocurrencyAmount,
              endedAt: params.endedAt ?? tradeDetails.endedAt,
              escrowReleaseDate:
                params.escrowReleaseDate ?? tradeDetails.escrowReleaseDate,
              expiredAt: params.expiredAt ?? tradeDetails.expiredAt,
              fiat: params.fiat ?? tradeDetails.fiat,
              fiatAmount: params.fiatAmount ?? tradeDetails.fiatAmount,
              id: params.id ?? tradeDetails.id,
              offer: params.offer ?? tradeDetails.offer,
              paid: params.paid ?? tradeDetails.paid,
              paymentConfirmed:
                params.paymentConfirmed ?? tradeDetails.paymentConfirmed,
              paymentMethod: params.paymentMethod ?? tradeDetails.paymentMethod,
              paymentReceipt:
                params.paymentReceipt ?? tradeDetails.paymentReceipt,
              status: params.status ?? tradeDetails.status,
              trader: params.trader ?? tradeDetails.trader,
              vendor: params.vendor ?? tradeDetails.vendor,
              chat: params.chat ?? tradeDetails.chat,
              tradeDetailsrWalletAddress:
                params.traderWalletAddress ?? tradeDetails.traderWalletAddress,
              vendorWalletAddress:
                params.vendorWalletAddress ?? tradeDetails.vendorWalletAddress,
            },
          };
        },
        false,
        actionName
      );
    },
    setTradeDetails: (tradeDetails) => {
      const setValue = get().tradeDetails.setTradeDetailsValue;

      setValue(tradeDetails, 'tradeDetails/setTrade');
    },
    resetTradeDetails: () => {
      const setValue = get().tradeDetails.setTradeDetailsValue;

      setValue({}, 'tradeDetails/resetTrade');
    },
  },
});
