export type AppIsMobileType = boolean;

export type AppDimensionType = [number, number];

export type AppWarningType = string[];

export type AppTypeType = 'buy' | 'sell';

export type AppThemeType = 'light' | 'dark';

export type AppFiatType = {
	id: string;
	name: string;
	symbol: string;
};

export type AppCryptocurrencyType = {
	id: string;
	name: string;
	symbol: string;
	coingeckoId: string;
};

export type AppPaymentMethodType = {
	id: string;
	name: string;
	paymentMethodCategory?: {
		id: string;
		name: string;
	};
};

export type AppBlockchainType = {
	name: string;
	nativeToken: {
		coingecko_id: string;
		symbol: string;
		name: string;
	};
};

export type CurrentPrice = {
	data: number | null;
	loading: boolean;
	fetched: boolean;
	errors: string[];
};

export type AppState = {
	isMobile: AppIsMobileType;
	dimensions: AppDimensionType;
	warnings: AppWarningType;
	type: AppTypeType;
	theme: AppThemeType;
	defaults: {
		fiat: AppFiatType | null;
		cryptocurrency: AppCryptocurrencyType | null;
		paymentMethod: AppPaymentMethodType | null;
	};
	blockchain: AppBlockchainType | null;
	currentPrice: CurrentPrice;
};
