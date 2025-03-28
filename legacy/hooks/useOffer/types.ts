export type GetOffersPaginationParams = {
	limit: number;
	skip: number;
	paymentMethodType: 'buy' | 'sell';
	rest?: any;
};

export type UseOfferParams = string;
