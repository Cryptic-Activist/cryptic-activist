import { Cryptocurrency } from '../cryptocurrencies/types';
import { Fiat } from '../fiats/types';

type PaymentMethodType = 'sell' | 'buy';

type Category = any;

type TradePricingType = 'market' | 'fixed';

export type CreateOfferState = {
	data: {
		section: {
			paymentMethod: boolean;
			tradePricing: boolean;
			tradeInstructions: boolean;
		};
		cryptocurrency: Cryptocurrency | null;
		fiat: Fiat | null;
		paymentMethodType: PaymentMethodType;
		category: Category | null;
		selection: string | null;
		isPaymentMethodCompleted: boolean;
		tradePricingType: TradePricingType;
		listAt: number;
		limitMin: number;
		limitMax: number;
		timeLimit: number;
		isTradePricingCompleted: boolean;
		tags: string[];
		label: string;
		terms: string;
		instructions: string;
		isTradeInstructionsCompleted: boolean;
		isFilled: boolean;
		isSubmitted: boolean;
	};
	loading: boolean;
	fetched: boolean;
	hasCreated: boolean;
	errors: string[];
};

export type ToggleSectionParams =
	| 'paymentMethod'
	| 'tradePricing'
	| 'tradeInstructions';

export type SectionParams = ToggleSectionParams;

export type CreateOfferPayload = {
	cryptocurrency?: Cryptocurrency | null;
	fiat?: Fiat | null;
	paymentMethodType?: PaymentMethodType;
	category?: Category | null;
	selection?: string | null;
	isPaymentMethodCompleted?: boolean;
	currentCryptocurrencyPrice?: number;
	tradePricingType?: TradePricingType;
	listAt?: number;
	limitMin?: number;
	limitMax?: number;
	timeLimit?: number;
	isTradePricingCompleted?: boolean;
	tags?: string[];
	label?: string;
	terms?: string;
	instructions?: string;
	isTradeInstructionsCompleted?: boolean;
	isFilled?: boolean;
	isSubmitted?: boolean;
};
