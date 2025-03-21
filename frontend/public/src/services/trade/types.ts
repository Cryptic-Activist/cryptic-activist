export type StartTradeParam = {
  vendorId: string;
  traderId: string;
  offerId: string;
  cryptocurrencyId: string;
  fiatId: string;
  cryptocurrencyAmount: number;
  fiatAmount: number;
};

export type getCurrentTradingFeeParams = {
  userId: string;
  cryptocurrencyId: string;
  fiatId: string;
  fiatAmount: number;
};
