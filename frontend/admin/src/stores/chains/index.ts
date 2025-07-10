import type { ChainsState, SetterParams } from './types';

import { map } from 'nanostores';

export const chains = map<ChainsState>({
	data: []
});

const setter = (params: SetterParams) => {
	const aux = chains.get();

	chains.set({
		data: params.data ?? aux.data
	});
};

export const setChains = async (params: SetterParams) => {
	setter(params);
};
