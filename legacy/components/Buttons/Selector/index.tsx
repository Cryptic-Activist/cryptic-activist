import { FC, useEffect } from 'react';

import { toggleModal } from '@store/reducers/navigationBar';
import { SelectorBtn } from '@styles/components/Buttons/Selector';

import { useAppDispatch, useAppSelector } from '@store/index';
import { setValue } from '@store/reducers/createOffer';
import { toUpperCase } from '@utils/string/string';
import { IButtonSelector } from './types';

const Selector: FC<IButtonSelector> = ({ modal, type }) => {
	const { app } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const { defaults } = app;

	useEffect(() => {
		if (type === 'create' && defaults.cryptocurrency && defaults.fiat) {
			dispatch(
				setValue({
					cryptocurrency: {
						id: defaults.cryptocurrency.id,
						coingeckoId: defaults.cryptocurrency.coingeckoId,
						symbol: defaults.cryptocurrency.symbol,
						name: defaults.cryptocurrency.name,
					},
				})
			);
			dispatch(
				setValue({
					fiat: {
						id: defaults.fiat.id,
						symbol: defaults.fiat.symbol,
						name: defaults.fiat.name,
					},
				})
			);
		}
	}, [defaults.cryptocurrency, defaults.fiat]);

	const handleSelect = () => {
		dispatch(
			toggleModal({
				modal: modal === 'cryptocurrenciesModal' ? 'cryptocurrencies' : 'fiats',
			})
		);
	};

	return (
		<>
			{defaults.fiat?.symbol &&
			defaults.fiat?.name &&
			defaults.cryptocurrency?.symbol &&
			defaults.cryptocurrency?.name ? (
				<SelectorBtn onClick={handleSelect}>
					<p>
						{modal === 'fiatsModal' &&
							`${toUpperCase(defaults.fiat?.symbol)} - ${defaults.fiat?.name}`}
						{modal === 'cryptocurrenciesModal' &&
							`${toUpperCase(defaults.cryptocurrency?.symbol)} - ${
								defaults.cryptocurrency?.name
							}`}
					</p>
				</SelectorBtn>
			) : (
				<SelectorBtn>
					<p>No data</p>
				</SelectorBtn>
			)}
		</>
	);
};

export default Selector;
