import { Fiat } from '@store/reducers/fiats/types';

export type List = Fiat[];

export type SearchProps = {
	fiatList: List;
	onFilter: (fiatList: List) => void;
};
