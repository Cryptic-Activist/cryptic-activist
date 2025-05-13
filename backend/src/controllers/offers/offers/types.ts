export type GetOffersRequest = {
  offerType?: string;
  cryptocurrencyId?: string;
  paymentMethodId?: string;
  fiatId?: string;
};

export type GetCurrentVendorOffersRequest = {
  id: string;
};

export type GetOffersPaginationRequest = {
  limit: string;
  offset: string;
  offerType?: string;
  cryptocurrencyId?: string;
  paymentMethodIds?: string;
  amount?: string;
  fiatId?: string;
  excludedVendorId?: string;
  cursor?: string;
};

export type GetMyOffersPaginationRequest = {
  limit: string;
  offerType?: string;
  fiatId?: string;
  cursor?: string;
};
