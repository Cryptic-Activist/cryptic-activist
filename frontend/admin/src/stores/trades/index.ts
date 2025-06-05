import type { SetterParams, TradesState } from './types';

import { map } from 'nanostores';

export const trades = map<TradesState>({
	data: [],
	totalPages: 1,
	currentPage: 1,
	pageSize: 10,
	filters: undefined
});

const setter = (params: SetterParams) => {
	const aux = trades.get();

	trades.set({
		currentPage: params.currentPage ?? aux.currentPage,
		data: params.data ?? aux.data,
		pageSize: params.pageSize ?? aux.pageSize,
		totalPages: params.totalPages ?? aux.totalPages,
		filters: {
			amount: params.filters?.amount ?? aux.filters?.amount,
			cryptocurrencyId:
				params.filters?.cryptocurrencyId ?? aux.filters?.cryptocurrencyId,
			dateRageEnd: params.filters?.dateRageEnd ?? aux.filters?.dateRageEnd,
			dateRageStart:
				params.filters?.dateRageStart ?? aux.filters?.dateRageStart,
			status: params.filters?.status ?? aux.filters?.status,
			username: params.filters?.username ?? aux.filters?.username
		}
	});
};

export const setTrades = async (params: SetterParams) => {
	setter(params);
};

export const setCurrentPage = (page: number) => {
	setter({ currentPage: page });
};
