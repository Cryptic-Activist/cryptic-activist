import { FC, useCallback } from 'react';

import { IFindOffers } from 'types/components/Search/Offers';

import { setType } from '@store/reducers/app';
import { toggleModal } from '@store/reducers/navigationBar';

import {
	Container,
	FieldContainer,
	Form,
	InfoDiv,
	Label,
	Select,
	SubmitButton,
	TopBtn,
	TopBtnsDiv,
} from '@styles/components/Search/Offers/OffersSearch';

import Info from '@components/Buttons/Info';
import Selector from '@components/Buttons/Selector';
import UnitConverter from '@components/UnitConverter';
import Filters from './Filters/Filters';

import { useAppDispatch, useAppSelector } from '@store/index';

const OffersSearch: FC<IFindOffers> = ({ borderColor, filters }) => {
	const dispatch = useAppDispatch();
	const { app } = useAppSelector((state) => state);

	const selectBuyTransaction = useCallback((): void => {
		dispatch(setType('buy'));
	}, []);

	const selectSellTransaction = useCallback((): void => {
		dispatch(setType('sell'));
	}, [dispatch]);

	const handleSelectFiat = useCallback(() => {
		dispatch(toggleModal({ modal: 'fiats' }));
	}, []);

	const handlePaymentMethods = useCallback(() => {
		dispatch(toggleModal({ modal: 'paymentMethods' }));
	}, []);

	return (
		<Container borderColor={borderColor}>
			<TopBtnsDiv>
				<TopBtn
					className={app.type === 'buy' && 'selected'}
					onClick={selectBuyTransaction}
				>
					Buy
				</TopBtn>
				<TopBtn
					className={app.type === 'sell' && 'selected'}
					onClick={selectSellTransaction}
				>
					Sell
				</TopBtn>
			</TopBtnsDiv>
			<Form>
				<FieldContainer>
					<Label>Cryptocurrency</Label>
					<Selector modal="cryptocurrenciesModal" type="search" />
					<InfoDiv>
						{app.defaults.cryptocurrency && app.defaults.fiat && (
							<>
								<UnitConverter />
								<Info
									message={`Current price of ${app.defaults.cryptocurrency?.name} in ${app.defaults.fiat?.name}`}
								/>
							</>
						)}
					</InfoDiv>
				</FieldContainer>
				<FieldContainer>
					<Label>{app.type === 'buy' ? 'Payment Method' : 'Get Paid In'}</Label>
					<Select>
						<p>
							{app.defaults.paymentMethod &&
							app.defaults.paymentMethod.id !== null &&
							app.defaults.paymentMethod.name !== null
								? `${app.defaults.paymentMethod.paymentMethodCategory.name} - ${app.defaults.paymentMethod.name}`
								: 'All Payment Methods'}
						</p>
						<button type="button" onClick={handlePaymentMethods}>
							Show All
						</button>
					</Select>
				</FieldContainer>
				<FieldContainer>
					<Label>{app.type === 'buy' ? 'You Pay' : 'You Get'}</Label>
					<Select>
						<input placeholder="Any amount" type="number" />
						{app.defaults.fiat?.symbol ? (
							<button type="button" onClick={handleSelectFiat}>
								{app.defaults.fiat?.symbol}
							</button>
						) : (
							<button>No data</button>
						)}
					</Select>
				</FieldContainer>
				{filters && <Filters />}
				<FieldContainer>
					<SubmitButton>Find Offer</SubmitButton>
				</FieldContainer>
			</Form>
		</Container>
	);
};

export default OffersSearch;
