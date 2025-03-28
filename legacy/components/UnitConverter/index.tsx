import { FC } from 'react';
import { IUnitConverter } from 'types/components/UnitConverter';

import { useCryptocurrency } from '@hooks/index';
import { useAppDispatch, useAppSelector } from '@store/index';
import { Converter } from '@styles/components/UnitConverter';
import { toUpperCase } from '@utils/string/string';

const UnitConverter: FC<IUnitConverter> = () => {
	const dispatch = useAppDispatch();
	const { app } = useAppSelector((state) => state);
	const { currentPrice } = useCryptocurrency();

	const getStatement = () => {
		const cryptocurrencySymbol = app.defaults.cryptocurrency.symbol;
		const fiatSymbol = app.defaults.fiat.symbol;
		const price = currentPrice;

		return `1 ${toUpperCase(cryptocurrencySymbol)} = ${price} ${toUpperCase(
			fiatSymbol
		)}`;
	};

	return (
		<Converter>
			{currentPrice !== null &&
			app.defaults.cryptocurrency &&
			app.defaults.fiat ? (
				<>{getStatement()}</>
			) : (
				'No data'
			)}
		</Converter>
	);
};

export default UnitConverter;
