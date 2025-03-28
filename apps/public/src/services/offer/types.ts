export type FetchOffersParams = {
  offerType?: string;
  cryptocurrencyId?: string;
  paymentMethodId?: string;
  fiatId?: string;
  excludedVendorId?: string;
  limit: number;
  cursor: string | null;
};
