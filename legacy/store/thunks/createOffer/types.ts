import { Cryptocurrency } from '@store/reducers/cryptocurrencies/types';
import { Fiat } from '@store/reducers/fiats/types';

export type CreateOfferParams = {
	vendorId: string;
	cryptocurrency: Cryptocurrency;
	fiat: Fiat;
	paymentMethodId: string;
	paymentMethodType: string;
	tradePricingType: string;
	tradePricingListAt: number;
	tradePricingTradeLimitsMin: number;
	tradePricingTradeLimitsMax: number;
	tradePricingTimeLimit: number;
	tradeInstructionsTags: string[];
	tradeInstructionsLabel: string;
	tradeInstructionsTerms: string;
	tradeInstructionsInstructions: string;
};
