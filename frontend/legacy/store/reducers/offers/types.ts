import { Cryptocurrency } from '../cryptocurrencies/types';
import { Feedback } from '../feedbacks/types';
import { Fiat } from '../fiats/types';
import { Trade } from '../trade/types';
import { Vendor } from '../vendor/types';

export type Offer = {
	id: string;
	cryptocurrency: Cryptocurrency;
	fiat: Fiat;
	feedbacks: Feedback[];
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
	trades: Trade[];
	vendor: Vendor;
	isDeleted: boolean;
	whenDeleted: string | null;
	createdAt: string;
	updatedAt: string;
};

export type OfferState = {
	data: Offer[];
	buy: Offer[];
	sell: Offer[];
	loading: boolean;
	fetched: boolean;
	errors: string[];
};
