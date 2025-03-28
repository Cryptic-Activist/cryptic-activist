import { IApp } from 'types/store/reducers';

export interface IFindOffers {
	borderColor: string;
	filters: boolean;
}

export interface IFilter {
	statement: string;
	type: 'payment-method' | 'tags' | 'trade-limit';
	insertIntoSearchFilterString: (
		type: 'payment-method' | 'tags' | 'trade-limit',
		string: string,
		checkedBox: boolean
	) => void;
}
