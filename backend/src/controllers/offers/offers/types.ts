export type GetOffersRequest = {
  offerType?: string;
  cryptocurrencyId?: string;
  paymentMethodId?: string;
  fiatId?: string;
};

export type GetOffersPaginationRequest = {
  limit: number;
  offset: number;
  offerType?: string;
  cryptocurrencyId?: string;
  paymentMethodId?: string;
  fiatId?: string;
};
