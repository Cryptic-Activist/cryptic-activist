export type ICryptocurrenciesList = {
	cryptocurrencies: {
		data: {
			id: string;
			coingecko_id: string;
			name: string;
			icon: string;
			symbol: string;
		}[];
		loading: boolean;
		fetched: boolean;
		errors: [];
	};
}
