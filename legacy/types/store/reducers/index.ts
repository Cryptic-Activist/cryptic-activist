import {
	ICryptocurrencyResponse,
	IFiatResponse,
	IOfferResponse,
	IPaymentMethodResponse,
	ISystemMessagesResponse,
	IUserResponse,
	IWalletResponse,
} from './response';

export interface IApp {
	isMobile: boolean;
	dimensions: number[];
	warnings: string[];
	type: 'buy' | 'sell';
	theme: 'light' | 'dark';
	defaults: {
		fiat: {
			id: string;
			name: string;
			symbol: string;
		};
		cryptocurrency: {
			id: string;
			coingecko_id: string;
			name: string;
			symbol: string;
		};
		payment_method: {
			id: string;
			name: string;
			payment_method_category: {
				id: string;
				name: string;
			};
		};
	};
}

export interface ICryptocurrencies {
	data: ICryptocurrencyResponse[];
	loading: boolean;
	fetched: boolean;
	errors: string[];
}

export interface IFiats {
	data: IFiatResponse[];
	loading: boolean;
	fetched: boolean;
	errors: string[];
}

export interface INavbar {
	loginForm: boolean;
	registerForm: boolean;
	resetPasswordForm: boolean;
	userModal: boolean;
	userDrawer: boolean;
	verifyAccount: boolean;
	walletModal: boolean;
	privateKeys: boolean;
	cryptocurrenciesModal: boolean;
	selectBlockchain: boolean;
	fiatsModal: boolean;
	paymentMethodsModal: boolean;
	isLoading: boolean;
}

export interface IUser {
	data: IUserResponse;
	loading: boolean;
	fetched: boolean;
	errors: string[];
}

export interface ICurrentOffers {
	data: IOfferResponse[];
	loading: boolean;
	fetched: boolean;
	errors: string[];
}

export interface IOffer {
	data: IOfferResponse;
	loading: boolean;
	fetched: boolean;
	errors: string[];
}

export interface IVendor {
	data: IUser;
	loading: boolean;
	fetched: boolean;
	errors: string[];
}

export interface IOffers {
	data: IOfferResponse[];
	loading: boolean;
	fetched: boolean;
	errors: string[];
}

export interface IWallet {
	data: IWalletResponse;
	loading: boolean;
	fetched: boolean;
	errors: string[];
}

export interface IState {
	app?: IApp;
	cryptocurrencies?: ICryptocurrencies;
	currentOffers?: ICurrentOffers;
	feedbacks?: any;
	fiats?: IFiats;
	navigationBar?: INavbar;
	offer?: IOffer;
	offers?: IOffers;
	user?: IUser;
	vendor?: IVendor;
	wallet?: IWallet;
}

export type TypePrivateKeys = string[];

export interface ICreate {
	data: {
		section: {
			paymentMethod: boolean;
			tradePricing: boolean;
			tradeInstructions: boolean;
		};
		cryptocurrency: null | string;
		cryptocurrencyObj: null | ICryptocurrencyResponse;
		fiat: null | string;
		fiatObj: null | IFiatResponse;
		paymentMethodType: 'buy' | 'sell';
		category: null | string;
		selection: null | string;
		isPaymentMethodCompleted: boolean;
		currentCryptocurrencyPrice: number;
		tradePricingType: 'market' | 'fixed';
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
	errors: string[];
}

export interface ISubmitCreateOffer {
	vendor_id: string;
	cryptocurrency_id: string;
	payment_method_type: string;
	payment_method_id: string;
	fiat_id: string;
	trade_pricing_type: string;
	trade_pricing_list_at: number;
	trade_pricing_trade_limits_min: number;
	trade_pricing_trade_limits_max: number;
	trade_pricing_time_limit: number;
	trade_instructions_tags: string[];
	trade_instructions_label: string;
	trade_instructions_terms: string;
	trade_instructions_instructions: string;
}
export interface IPaymentMethods {
	data: IPaymentMethodResponse[];
	loading: boolean;
	fetched: boolean;
	errors: string[];
}

export interface ISystemMessages {
	data: ISystemMessagesResponse[];
	loading: boolean;
	fetched: boolean;
	errors: string[];
}
