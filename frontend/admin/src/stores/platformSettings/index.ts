import type { SetterParams, TradesState } from './types';

import { map } from 'nanostores';

export const platformSettings = map<TradesState>({
	public: [],
	private: []
});

const setter = (params: SetterParams) => {
	const aux = platformSettings.get();

	platformSettings.set({
		public: params.public ?? aux.public,
		private: params.private ?? aux.private
	});
};

export const setPlatformSettings = async (params: SetterParams) => {
	setter(params);
};
