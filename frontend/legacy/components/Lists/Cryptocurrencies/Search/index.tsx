import { ChangeEvent, FC, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

import {
	Container,
	Input,
	SearchButton,
} from '@styles/components/Lists/Cryptocurrencies/Search';
import { toLowerCase } from '@utils/string/string';

import { SearchProps } from './types';

const Search: FC<SearchProps> = ({ cryptocurrencyList, onFilter }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const onFilterCryptocurrencies = (e: ChangeEvent<HTMLInputElement>) => {
		const term = e.currentTarget.value;

		const filtered = cryptocurrencyList.filter((cryptocurrency) => {
			return (
				toLowerCase(cryptocurrency.coingeckoId).includes(toLowerCase(term)) ||
				toLowerCase(cryptocurrency.name).includes(toLowerCase(term)) ||
				toLowerCase(cryptocurrency.symbol).includes(toLowerCase(term))
			);
		});

		onFilter(filtered);
	};

	useEffect(() => {
		if (inputRef) {
			inputRef.current.focus();
		}
	}, [inputRef]);

	return (
		<Container>
			<Input
				placeholder="Search Cryptocurency"
				onChange={onFilterCryptocurrencies}
				ref={inputRef}
			/>
			<SearchButton>
				<FaSearch />
			</SearchButton>
		</Container>
	);
};

export default Search;
