import { IApp, ICreate } from 'types/store/reducers';

export type IButtonSelector = {
	modal: 'fiatsModal' | 'cryptocurrenciesModal';
	type: 'search' | 'create';
};
