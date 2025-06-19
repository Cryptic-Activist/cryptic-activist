import type { KYCsState, SetterParams } from './types';

import { map } from 'nanostores';

export const kycs = map<KYCsState>({
	data: [],
	totalPages: 1,
	currentPage: 1,
	pageSize: 10,
	filters: undefined
});

const setter = (params: SetterParams) => {
	const aux = kycs.get();

	kycs.set({
		currentPage: params.currentPage ?? aux.currentPage,
		data: params.data ?? aux.data,
		pageSize: params.pageSize ?? aux.pageSize,
		totalPages: params.totalPages ?? aux.totalPages,
		filters: {
			status: params.filters?.status ?? aux.filters?.status,
			username: params.filters?.username ?? aux.filters?.username
		}
	});
};

export const setKYCs = async (params: SetterParams) => {
	setter(params);
};

export const setKYCsCurrentPage = (page: number) => {
	setter({ currentPage: page });
};
