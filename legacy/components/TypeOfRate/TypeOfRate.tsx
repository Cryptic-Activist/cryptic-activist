import { FC, useEffect, useState } from 'react';

import { setValue } from '@store/reducers/createOffer';

import {
	Container,
	Description,
	Ratio,
	Selection,
	Statements,
	Strong,
} from '@styles/components/BuySell';

import { useAppDispatch, useAppSelector } from '@store/index';

const TypeOfRate: FC = () => {
	const dispatch = useAppDispatch();
	const { createOffer } = useAppSelector((state) => state);

	const [type, setType] = useState<'market' | 'fixed'>('market');

	const { cryptocurrency } = createOffer.data;

	const unselectAllSelection = (): void => {
		const allSelectedSelection = document
			.querySelector('.buySellSelection')
			.querySelectorAll('.selected');

		allSelectedSelection.forEach((category) => {
			category.classList.remove('selected');
		});
	};

	const handleSelectMarketPrice = (e): void => {
		unselectAllSelection();
		e.currentTarget.classList.add('selected');
		setType('market');
	};

	const handleSelectFixedPrice = (e): void => {
		unselectAllSelection();
		e.currentTarget.classList.add('selected');
		setType('fixed');
	};

	useEffect(() => {
		dispatch(setValue({ tradePricingType: type }));
	}, [type]);

	return (
		<Container className="buySellSelection">
			<Selection className="selected" onClick={handleSelectMarketPrice}>
				<Ratio className="ratio">
					<div />
				</Ratio>
				<Statements>
					<Strong>Market Price</Strong>
					<Description>
						Your offer’s selling price will change according to the market price of{' '}
						{cryptocurrency?.name}
					</Description>
				</Statements>
			</Selection>

			<Selection onClick={handleSelectFixedPrice}>
				<Ratio className="ratio">
					<div />
				</Ratio>
				<Statements>
					<Strong>Fixed Price</Strong>
					<Description>
						Your offer’s selling price is locked when the offer is created, and won’t
						change with market price of {cryptocurrency?.name}
					</Description>
				</Statements>
			</Selection>
		</Container>
	);
};

export default TypeOfRate;
