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
    id: undefined,
    cryptocurrency: undefined,
    cryptocurrencyAmount: undefined,
    endedAt: undefined,
    escrowReleaseDate: undefined,
    expiredAt: undefined,
    fiat: undefined,
    fiatAmount: undefined,
    offer: undefined,
    paidAt: undefined,
    paymentMethod: undefined,
    fundedAt: undefined,
    startedAt: undefined,
    exchangeRate: undefined,
    blockchainTransactionHash: undefined,
    paymentReceipt: undefined,
    paymentConfirmedAt: undefined,
    status: undefined,
    trader: undefined,
    vendor: undefined,
    chat: undefined,
    createdAt: undefined,
    tradeDispute: undefined,
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
              paid: params.paidAt ?? trade.paidAt,
              paymentConfirmedAt:
                params.paymentConfirmedAt ?? trade.paymentConfirmedAt,
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
              startedAt: params.startedAt ?? trade.startedAt,
              fundedAt: params.fundedAt ?? trade.fundedAt,
              exchangeRate: params.exchangeRate ?? trade.exchangeRate,
              blockchainTransactionHash:
                params.blockchainTransactionHash ??
                trade.blockchainTransactionHash,
              createdAt: params.createdAt ?? trade.createdAt,
              tradeDispute: params.tradeDispute ?? trade.tradeDispute,
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
