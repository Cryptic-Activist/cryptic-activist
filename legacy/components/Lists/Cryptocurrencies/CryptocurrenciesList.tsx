import { FC, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import { useAppDispatch, useAppSelector } from '@store/index';
import { Cryptocurrency } from '@store/reducers/cryptocurrencies/types';
import { resetNavigationBar } from '@store/reducers/navigationBar';
import { getDefaultCryptocurrency as getDefaultCryptocurrencyThunk } from '@store/thunks/app';
import {
	Background,
	CloseBtn,
	Container,
	Empty,
	Heading,
	HeadingCloseDiv,
	Item,
	List,
} from '@styles/components/Lists/Cryptocurrencies/CryptocurrenciesList';
import { toUpperCase } from '@utils/string/string';

import Search from './Search';

const CryptocurrenciesList: FC = () => {
	const dispatch = useAppDispatch();
	const { cryptocurrencies } = useAppSelector((state) => state);
	const [cryptocurrencyList, setCryptocurrencyList] = useState<Cryptocurrency[]>(
		cryptocurrencies.data || []
	);

	const onFilter = (list: Cryptocurrency[]) => {
		setCryptocurrencyList(list);
	};

	const closeModal = () => {
		dispatch(resetNavigationBar('modals'));
	};

	const selectCryptocurrency = (cryptocurrencySymbol: string) => {
		dispatch(
			getDefaultCryptocurrencyThunk({
				defaultCryptocurrency: cryptocurrencySymbol,
			})
		);
		closeModal();
	};

	return (
		<>
			<Background onClick={closeModal} />
			<Container>
				<HeadingCloseDiv>
					<Heading>Cryptocurrencies</Heading>
					<CloseBtn onClick={closeModal}>
						<FaPlus />
					</CloseBtn>
				</HeadingCloseDiv>
				<Search cryptocurrencyList={cryptocurrencies?.data} onFilter={onFilter} />
				<List>
					{cryptocurrencies.data.length > 0 &&
						!cryptocurrencies.loading &&
						cryptocurrencies.fetched &&
						cryptocurrencies.errors.length === 0 && (
							<>
								{cryptocurrencyList.map((crypto) => (
									<Item
										key={crypto.id}
										onClick={() => selectCryptocurrency(crypto.coingeckoId)}
									>
										<button type="button">{`${toUpperCase(crypto.symbol)} - ${
											crypto.name
										}`}</button>
									</Item>
								))}
							</>
						)}
					{cryptocurrencies.data.length === 0 &&
						!cryptocurrencies.loading &&
						cryptocurrencies.fetched &&
						cryptocurrencies.errors.length === 0 && <Empty>No Items</Empty>}
					{cryptocurrencies.data.length === 0 &&
						!cryptocurrencies.loading &&
						!cryptocurrencies.fetched &&
						cryptocurrencies.errors.length > 0 && <Empty>Error</Empty>}
				</List>
			</Container>
		</>
	);
};

export default CryptocurrenciesList;
