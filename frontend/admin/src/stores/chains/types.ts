export type Chain = {
	id?: string;
	name?: string;
	symbol?: string;
	coingeckoId?: string;
	logoUrl?: string;
	chainId?: number;
	description?: string;
};

export type ChainsState = {
	data?: Chain[];
};

export type SetterParams = {
	data?: Chain[];
};

export type Value = SetterParams;
