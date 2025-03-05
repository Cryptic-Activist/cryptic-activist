import { Cryptocurrency } from '@store/reducers/cryptocurrencies/types';

export type List = Cryptocurrency[];

export type SearchProps = {
	cryptocurrencyList: List;
	onFilter: (cryptocurrenciesList: List) => void;
};
