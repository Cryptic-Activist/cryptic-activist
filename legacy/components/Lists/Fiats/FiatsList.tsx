import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import { useAppDispatch, useAppSelector } from '@store/index';
import { Fiat } from '@store/reducers/fiats/types';
import { resetNavigationBar } from '@store/reducers/navigationBar';
import { getDefaultFiat as getDefaultFiatThunk } from '@store/thunks/app';
import {
	Background,
	CloseBtn,
	Container,
	Empty,
	Heading,
	HeadingCloseDiv,
	Item,
	List,
} from '@styles/components/Lists/Fiats/FiatsList';

import Search from './Search';

const FiatsList = () => {
	const dispatch = useAppDispatch();
	const { fiats } = useAppSelector((state) => state);
	const [fiatList, setFiatList] = useState<Fiat[]>(fiats.data || []);

	const onFilter = (list: Fiat[]) => {
		setFiatList(list);
	};

	const closeModal = () => {
		dispatch(resetNavigationBar('modals'));
	};

	const selectFiat = (fiatSymbol: string) => {
		dispatch(getDefaultFiatThunk({ defaultFiat: fiatSymbol }));
		closeModal();
	};

	return (
		<>
			<Background onClick={closeModal} />
			<Container>
				<HeadingCloseDiv>
					<Heading>Fiats</Heading>
					<CloseBtn onClick={closeModal}>
						<FaPlus />
					</CloseBtn>
				</HeadingCloseDiv>
				<Search fiatList={fiats?.data} onFilter={onFilter} />
				<List>
					{fiats.data.length > 0 &&
						!fiats.loading &&
						fiats.fetched &&
						fiats.errors.length === 0 && (
							<>
								{fiatList.map((fiat) => (
									<Item key={fiat.id} onClick={() => selectFiat(fiat.symbol)}>
										<button type="button">{`${fiat.symbol} - ${fiat.name}`}</button>
									</Item>
								))}
							</>
						)}
					{fiats.data.length === 0 &&
						!fiats.loading &&
						fiats.fetched &&
						fiats.errors.length === 0 && <Empty>No Items</Empty>}
					{fiats.data.length === 0 &&
						!fiats.loading &&
						!fiats.fetched &&
						fiats.errors.length > 0 && <Empty>Error</Empty>}
				</List>
			</Container>
		</>
	);
};

export default FiatsList;
