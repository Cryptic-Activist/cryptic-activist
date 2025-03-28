import { FC } from 'react';
import { FaSortAmountDownAlt } from 'react-icons/fa';

import { IOffersList } from 'types/components/Lists/Offers/OffersList';

import useOffer from '@hooks/useOffer';
import { useAppDispatch, useAppSelector } from '@store/index';
import {
	Container,
	EmptyP,
	Header,
	HeaderMobile,
	HeaderTitleLeft,
	HeaderTitleRight,
	List,
	SortButton,
} from '@styles/components/Lists/Offers/OffersList';
import Offer from './Offer/Offer';

const OffersList: FC<IOffersList> = ({ height }) => {
	const dispatch = useAppDispatch();
	const { app } = useAppSelector((state) => state);
	const { offers } = useOffer();

	return (
		<Container height={height}>
			{app.isMobile ? (
				<HeaderMobile>
					<HeaderTitleLeft>
						{app.type === 'buy' && 'Buy from'}
						{app.type === 'sell' && 'Sell from'}
					</HeaderTitleLeft>
					<HeaderTitleRight>
						Rate
						<SortButton>
							<FaSortAmountDownAlt />
						</SortButton>
					</HeaderTitleRight>
				</HeaderMobile>
			) : (
				<Header>
					<HeaderTitleLeft>
						{app.type === 'buy' && 'Buy from'}
						{app.type === 'sell' && 'Sell from'}
					</HeaderTitleLeft>
					<HeaderTitleLeft>
						{app.type === 'buy' && 'Pay with'}
						{app.type === 'sell' && 'Sell for'}
					</HeaderTitleLeft>
					<HeaderTitleRight>Avg. trade speed</HeaderTitleRight>
					<HeaderTitleRight>
						Rate
						<SortButton>
							<FaSortAmountDownAlt />
						</SortButton>
					</HeaderTitleRight>
				</Header>
			)}
			<List>
				{offers[app.type]?.map((offer) => (
					<Offer key={offer.id} offer={offer} />
				))}
				{offers.data &&
					Object.entries(offers.data).length === 0 &&
					!offers.loading &&
					offers.fetched &&
					offers.errors.length === 0 && <EmptyP>No offers</EmptyP>}
			</List>
		</Container>
	);
};

export default OffersList;
