import type { SetterParams, TradesState } from './types';

import { BACKEND } from '@/constants/envs';
import { fetchGet } from '@/services/axios';
import { map } from 'nanostores';

export const trades = map<TradesState>({
	data: [],
	totalPages: 1,
	currentPage: 1,
	pageSize: 10
});

const setter = (params: SetterParams) => {
	const aux = trades.get();

	trades.set({
		currentPage: params.currentPage ?? aux.currentPage,
		data: params.data ?? aux.data,
		pageSize: params.pageSize ?? aux.pageSize,
		totalPages: params.totalPages ?? aux.totalPages
	});
};

export const setTrades = async (params: SetterParams) => {
	setter(params);
};

export const setCurrentPage = (page: number) => {
	setter({ currentPage: page });
};
