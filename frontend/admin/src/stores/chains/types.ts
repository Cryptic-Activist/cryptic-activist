export type Chain = {
	id?: string;
	name?: string;
	symbol?: string;
	chainId?: number;
	rpcUrl?: string;
};

export type ChainsState = {
	data?: Chain[];
};

export type SetterParams = {
	data?: Chain[];
};

export type Value = SetterParams;
