import { ChangeEvent, FC, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

import {
	Container,
	Input,
	SearchButton,
} from '@styles/components/Lists/Cryptocurrencies/Search';
import { toLowerCase } from '@utils/string/string';

import { SearchProps } from './types';

const Search: FC<SearchProps> = ({ fiatList, onFilter }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const onFilterFiats = (e: ChangeEvent<HTMLInputElement>) => {
		const term = e.currentTarget.value;

		const filtered = fiatList.filter((fiat) => {
			return (
				toLowerCase(fiat.name).includes(toLowerCase(term)) ||
				toLowerCase(fiat.symbol).includes(toLowerCase(term))
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
			<Input placeholder="Search Fiat" onChange={onFilterFiats} ref={inputRef} />
			<SearchButton>
				<FaSearch />
			</SearchButton>
		</Container>
	);
};

export default Search;
