export type FetchOffersParams = {
  offerType?: string;
  cryptocurrencyId?: string;
  chainId?: string;
  paymentMethodIds?: string;
  fiatId?: string;
  excludedVendorId?: string;
  amount?: number;
  limit: number;
  cursor: string | null;
};
