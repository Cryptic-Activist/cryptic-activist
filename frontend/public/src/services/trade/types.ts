export type StartTradeParam = {
  vendorId: string;
  traderId: string;
  offerId: string;
  cryptocurrencyId: string;
  fiatId: string;
  paymentMethodId: string;
  cryptocurrencyAmount: number;
  fiatAmount: number;
  traderWalletAddress: string;
};

export type getCurrentTradingFeeParams = {
  userId: string;
  cryptocurrencyId: string;
  fiatId: string;
  fiatAmount: number;
  currentPrice: number;
  offerId: string;
  decimals: number;
};

export type SubmitDisputeParams = {
  formData: FormData;
};
