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
    escrowReleasedAt: undefined,
    expiredAt: undefined,
    fiat: undefined,
    fiatAmount: undefined,
    offer: undefined,
    paidAt: undefined,
    paymentMethod: undefined,
    fundedAt: undefined,
    disputedAt: undefined,
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
    tradeEscrowDetails: undefined,
    traderWallet: undefined,
    vendorWallet: undefined,
    vendorRejectedFunding: undefined,
    traderRejectedFunding: undefined,
    buyerFundedAt: undefined,
    sellerFundedAt: undefined,
    buyerId: undefined,
    sellerId: undefined,
    token: undefined,
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
              escrowReleasedAt:
                params.escrowReleasedAt ?? trade.escrowReleasedAt,
              expiredAt: params.expiredAt ?? trade.expiredAt,
              fiat: params.fiat ?? trade.fiat,
              fiatAmount: params.fiatAmount ?? trade.fiatAmount,
              id: params.id ?? trade.id,
              offer: params.offer ?? trade.offer,
              paidAt: params.paidAt ?? trade.paidAt,
              paymentConfirmedAt:
                params.paymentConfirmedAt ?? trade.paymentConfirmedAt,
              paymentMethod: params.paymentMethod ?? trade.paymentMethod,
              paymentReceipt: params.paymentReceipt ?? trade.paymentReceipt,
              status: params.status ?? trade.status,
              trader: params.trader ?? trade.trader,
              vendor: params.vendor ?? trade.vendor,
              chat: params.chat ?? trade.chat,
              buyerId: params.buyerId ?? trade.buyerId,
              buyerFundedAt: params.buyerFundedAt ?? trade.buyerFundedAt,
              sellerId: params.sellerId ?? trade.sellerId,
              sellerFundedAt: params.sellerFundedAt ?? trade.sellerFundedAt,
              traderRejectedFunding:
                params.traderRejectedFunding ?? trade.traderRejectedFunding,
              vendorRejectedFunding:
                params.vendorRejectedFunding ?? trade.vendorRejectedFunding,
              traderWallet: params.traderWallet ?? trade.traderWallet,
              vendorWallet: params.vendorWallet ?? trade.vendorWallet,
              startedAt: params.startedAt ?? trade.startedAt,
              fundedAt: params.fundedAt ?? trade.fundedAt,
              disputedAt: params.disputedAt ?? trade.disputedAt,
              exchangeRate: params.exchangeRate ?? trade.exchangeRate,
              blockchainTransactionHash:
                params.blockchainTransactionHash ??
                trade.blockchainTransactionHash,
              createdAt: params.createdAt ?? trade.createdAt,
              tradeDispute: params.tradeDispute ?? trade.tradeDispute,
              tradeEscrowDetails:
                params.tradeEscrowDetails ?? trade.tradeEscrowDetails,
              token: params.token ?? trade.token,
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
      set(
        ({ trade }) => {
          return {
            trade: {
              ...trade,
              cryptocurrency: undefined,
              cryptocurrencyAmount: undefined,
              endedAt: undefined,
              escrowReleasedAt: undefined,
              expiredAt: undefined,
              fiat: undefined,
              fiatAmount: undefined,
              id: undefined,
              offer: undefined,
              paidAt: undefined,
              paymentConfirmedAt: undefined,
              paymentMethod: undefined,
              paymentReceipt: undefined,
              status: undefined,
              trader: undefined,
              vendor: undefined,
              chat: undefined,
              buyerId: undefined,
              buyerFundedAt: undefined,
              sellerId: undefined,
              sellerFundedAt: undefined,
              traderRejectedFunding: undefined,
              vendorRejectedFunding: undefined,
              traderWallet: undefined,
              vendorWallet: undefined,
              startedAt: undefined,
              fundedAt: undefined,
              disputedAt: undefined,
              exchangeRate: undefined,
              blockchainTransactionHash: undefined,
              createdAt: undefined,
              tradeDispute: undefined,
              tradeEscrowDetails: undefined,
              token: undefined,
            },
          };
        },
        false,
        'trade/resetTrade'
      );
    },
  },
});
