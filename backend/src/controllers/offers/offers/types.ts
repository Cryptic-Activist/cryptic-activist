export type GetOffersRequest = {
  offerType?: string;
  cryptocurrencyId?: string;
  paymentMethodId?: string;
  fiatId?: string;
};

export type GetOffersPaginationRequest = {
  limit: string;
  offset: string;
  offerType?: string;
  cryptocurrencyId?: string;
  paymentMethodId?: string;
  fiatId?: string;
  excludedVendorId?: string[];
};
