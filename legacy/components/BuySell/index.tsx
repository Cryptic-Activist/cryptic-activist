import { useAppDispatch, useAppSelector } from '@store/index';
import {
	Container,
	Description,
	Ratio,
	Selection,
	Statements,
	Strong,
} from '@styles/components/BuySell';
// import { setValue } from 'oldStore/actions/create';
import { setValue } from '@store/reducers/createOffer';
import { FC } from 'react';
import { IBuySell } from './types';

const BuySell: FC<IBuySell> = () => {
	const dispatch = useAppDispatch();
	const { createOffer } = useAppSelector((state) => state);

	const { cryptocurrency } = createOffer.data;

	const unselectAllSelection = (): void => {
		const allSelectedSelection = document
			.querySelector('.buySellSelection')
			.querySelectorAll('.selected');

		allSelectedSelection.forEach((category) => {
			category.classList.remove('selected');
		});
	};

	const handleSelectBuySell = (e, type: 'buy' | 'sell'): void => {
		unselectAllSelection();
		e.currentTarget.classList.add('selected');
		dispatch(setValue({ paymentMethodType: type }));
	};

	return (
		<Container className="buySellSelection">
			<Selection
				className="selected"
				onClick={(e) => handleSelectBuySell(e, 'sell')}
			>
				<Ratio className="ratio">
					<div />
				</Ratio>
				<Statements>
					<Strong>{`Sell ${cryptocurrency.name}`}</Strong>
					<Description>
						Once created, your offer will be visible on Vendors page when potential
						buyers are looking for {cryptocurrency.name} sellers.
					</Description>
				</Statements>
			</Selection>

			<Selection onClick={(e) => handleSelectBuySell(e, 'buy')}>
				<Ratio className="ratio">
					<div />
				</Ratio>
				<Statements>
					<Strong>{`Buy ${cryptocurrency.name}`}</Strong>
					<Description>
						Once created, your offer will be visible on Vendors page when potential
						sellers are looking for {cryptocurrency.name} buyers.
					</Description>
				</Statements>
			</Selection>
		</Container>
	);
};

export default BuySell;
