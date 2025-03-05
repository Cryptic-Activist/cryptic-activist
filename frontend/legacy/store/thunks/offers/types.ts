import { Offer } from '@store/reducers/offers/types';

export type OffersParams = {
	limit?: number;
	skip?: number;
	paymentMethodType?: string;
	rest?: any;
};

export type GetOffersReturn = Offer[];
