import { FC } from 'react';

import {
	Container,
	EmptyP,
	Header,
	HeaderTitle,
	HeaderTitleLeft,
	List,
} from '@styles/components/Lists/CurrentOffers/CurrentOffersList';
import { SelectTypeParams } from './types';

import useCurrentOffers from '@hooks/useCurrentOffers';
import { useAppDispatch, useAppSelector } from '@store/index';
import { setType } from '@store/reducers/app';
import Offer from './Offer/Offer';

const CurrentOffersList: FC = () => {
	const dispatch = useAppDispatch();
	const { app, vendor } = useAppSelector((state) => state);
	const { currentOffers } = useCurrentOffers({ id: vendor.data.id });

	const selectType = (type: SelectTypeParams) => {
		dispatch(setType(type));
	};

	return (
		<Container>
			<Header>
				<HeaderTitleLeft
					className={app.type === 'buy' && 'selected'}
					onClick={() => selectType('buy')}
				>
					Buy cryptocurrencies
				</HeaderTitleLeft>
				<HeaderTitle
					className={app.type === 'sell' && 'selected'}
					onClick={() => selectType('sell')}
				>
					Sell cryptocurrencies
				</HeaderTitle>
			</Header>
			<List>
				{currentOffers[app.type].map((currentOffer) => (
					<Offer key={currentOffer.id} offer={currentOffer} />
				))}
				{currentOffers.data && Object.entries(currentOffers.data).length === 0 && (
					<EmptyP>No current offers</EmptyP>
				)}
			</List>
		</Container>
	);
};

export default CurrentOffersList;
