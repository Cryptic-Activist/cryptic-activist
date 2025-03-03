import { Offer } from '@store/reducers/offers/types';

export type ICurrentOffersList = {};

export type ICurrentOffer = {
	offer: Offer;
};

export type SelectTypeParams = 'buy' | 'sell';
