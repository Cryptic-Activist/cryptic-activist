export type GetTradesParams = {
	page: number;
	pageSize: number;
	status?: string;
	cryptocurrencyId?: string;
	dateRageStart?: Date;
	dateRageEnd?: Date;
	amount?: string;
	username?: string;
};
