import type { DisputeState, SetterParams } from './types';

import { map } from 'nanostores';

export const dispute = map<DisputeState>({
	createdAt: undefined,
	id: undefined,
	moderator: undefined,
	priority: undefined,
	severity: undefined,
	slaDueAt: undefined,
	status: undefined,
	trade: undefined,
	type: undefined,
	loser: undefined,
	raisedBy: undefined,
	resolutionNote: undefined,
	resolutionType: undefined,
	evidences: undefined,
	resolvedAt: undefined,
	updatedAt: undefined,
	winner: undefined,
	traderStatement: undefined,
	vendorStatement: undefined
});

const setter = (params: SetterParams) => {
	const aux = dispute.get();

	console.log({ params });

	dispute.set({
		createdAt: params.createdAt ?? aux.createdAt,
		id: params.id ?? aux.id,
		moderator: params.moderator ?? aux.moderator,
		priority: params.priority ?? aux.priority,
		severity: params.severity ?? aux.severity,
		slaDueAt: params.slaDueAt ?? aux.slaDueAt,
		status: params.status ?? aux.status,
		trade: params.trade ?? aux.trade,
		evidences: params.evidences ?? aux.evidences,
		type: params.type ?? aux.type,
		loser: params.loser ?? aux.loser,
		raisedBy: params.raisedBy ?? aux.raisedBy,
		resolutionType: params.resolutionType ?? aux.resolutionType,
		resolutionNote: params.resolutionNote ?? aux.resolutionNote,
		resolvedAt: params.resolvedAt ?? aux.resolvedAt,
		updatedAt: params.updatedAt ?? aux.updatedAt,
		winner: params.winner ?? aux.winner,
		traderStatement: params.traderStatement ?? aux.traderStatement,
		vendorStatement: params.vendorStatement ?? aux.vendorStatement
	});
};

export const setDispute = async (params: SetterParams) => {
	setter(params);
};

export const resetDispute = async () => {
	dispute.set({
		createdAt: undefined,
		id: undefined,
		moderator: undefined,
		priority: undefined,
		severity: undefined,
		slaDueAt: undefined,
		status: undefined,
		trade: undefined,
		type: undefined,
		loser: undefined,
		raisedBy: undefined,
		resolutionType: undefined,
		resolutionNote: undefined,
		resolvedAt: undefined,
		updatedAt: undefined,
		winner: undefined,
		traderStatement: undefined,
		vendorStatement: undefined,
		evidences: undefined
	});
};
