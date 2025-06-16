import type { DisputesState, SetterParams } from './types';

import { map } from 'nanostores';

export const disputes = map<DisputesState>({
	data: [],
	totalPages: 1,
	currentPage: 1,
	pageSize: 10,
	filters: undefined
});

const setter = (params: SetterParams) => {
	const aux = disputes.get();

	disputes.set({
		currentPage: params.currentPage ?? aux.currentPage,
		data: params.data ?? aux.data,
		pageSize: params.pageSize ?? aux.pageSize,
		totalPages: params.totalPages ?? aux.totalPages,
		filters: {
			amount: params.filters?.amount ?? aux.filters?.amount,
			moderator: params.filters?.moderator ?? aux.filters?.moderator,
			severity: params.filters?.severity ?? aux.filters?.severity,
			status: params.filters?.status ?? aux.filters?.status,
			type: params.filters?.type ?? aux.filters?.type
		}
	});
};

export const setDisputes = async (params: SetterParams) => {
	setter(params);
};

export const setDisputesCurrentPage = (page: number) => {
	setter({ currentPage: page });
};
