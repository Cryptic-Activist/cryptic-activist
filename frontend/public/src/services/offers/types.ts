export type FetchOffersParams = {
  offerType?: string;
  cryptocurrencyId?: string;
  paymentMethodId?: string;
  fiatId?: string;
  excludedVendorId?: string;
  amount?: number;
  limit: number;
  cursor: string | null;
};
