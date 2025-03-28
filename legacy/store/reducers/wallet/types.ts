export type AppState = {
	wallet: {
		address: string | null;
	};
	loading: boolean;
	fetched: boolean;
	errors: string[];
};
