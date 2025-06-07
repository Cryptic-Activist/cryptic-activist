import type { DisputeState, SetterParams } from './types';

import { map } from 'nanostores';

export const dispute = map<DisputeState>({
	amount: undefined,
	createdAt: undefined,
	id: undefined,
	moderator: undefined,
	priority: undefined,
	severity: undefined,
	slaDueAt: undefined,
	status: undefined,
	trade: undefined,
	type: undefined
});

const setter = (params: SetterParams) => {
	const aux = dispute.get();

	dispute.set({
		amount: params.amount ?? aux.amount,
		createdAt: params.createdAt ?? aux.createdAt,
		id: params.id ?? aux.id,
		moderator: params.moderator ?? aux.moderator,
		priority: params.priority ?? aux.priority,
		severity: params.severity ?? aux.severity,
		slaDueAt: params.slaDueAt ?? aux.slaDueAt,
		status: params.status ?? aux.status,
		trade: params.trade ?? aux.trade,
		type: params.type ?? aux.type
	});
};

export const setDispute = async (params: SetterParams) => {
	setter(params);
};
