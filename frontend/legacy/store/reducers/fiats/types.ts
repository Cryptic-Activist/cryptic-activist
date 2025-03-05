export type Fiat = {
	id: string;
	name: string;
	symbol: string;
	coingeckoId: string;
};

export type FiatsState = {
	data: Fiat[];
	loading: boolean;
	fetched: boolean;
	errors: string[];
};
