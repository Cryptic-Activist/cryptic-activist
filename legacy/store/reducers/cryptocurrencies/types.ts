export type Cryptocurrency = {
	id: string;
	name: string;
	symbol: string;
	coingeckoId: string;
};

export type CryptocurrenciesState = {
	data: Cryptocurrency[];
	loading: boolean;
	fetched: boolean;
	errors: string[];
};
