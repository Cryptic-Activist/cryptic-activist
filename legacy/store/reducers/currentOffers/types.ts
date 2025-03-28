import { Cryptocurrency } from '../cryptocurrencies/types';
import { Fiat } from '../fiats/types';
import { Vendor } from '../vendor/types';

type CurrentOffer = {
	id: string;
	cryptocurrency: Cryptocurrency;
	fiat: Fiat;
	paymentMethod: any;
	paymentMethodType: string;
	tradeInstructionsInstructions: string;
	tradeInstructionsLabel: string;
	tradeInstructionsTags: string[];
	tradeInstructionsTerms: string;
	tradePricingListAt: number;
	tradePricingTimeLimit: number;
	tradePricingTradeLimitsMax: number;
	tradePricingTradeLimitsMin: number;
	tradePricingType: string;
	vendor: Vendor;
	isDeleted: boolean;
	whenDeleted: string | null;
	createdAt: string;
	updatedAt: string;
};

export type CurrentOffersState = {
	data: CurrentOffer[];
	buy: CurrentOffer[];
	sell: CurrentOffer[];
	loading: boolean;
	fetched: boolean;
	errors: string[];
};
