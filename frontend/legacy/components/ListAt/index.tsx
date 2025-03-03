import MinusPlusInput from '@components/MinusPlusInput/MinusPlusInput';
import { useCryptocurrency } from '@hooks/index';
import { useAppDispatch, useAppSelector } from '@store/index';
import { setValue } from '@store/reducers/createOffer';
import {
	PriceAboveAverage,
	PriceAboveAverageHeading,
	PriceAboveAverageRow,
	PriceAboveAverageSpan,
	PriceAboveAverageStatement,
} from '@styles/sections/Offer/Create/TradePricing';

import { useCallback, useEffect } from 'react';

const ListAt = () => {
	const dispatch = useAppDispatch();
	const { createOffer, app } = useAppSelector((state) => state);
	const { currentPrice } = useCryptocurrency();
	const { tradePricingType, listAt } = createOffer.data;
	const { defaults } = app;
	const { cryptocurrency, fiat } = defaults;

	useEffect(() => {
		const listAtValue = tradePricingType === 'fixed' ? currentPrice : 0;
		dispatch(setValue({ listAt: listAtValue }));
	}, [currentPrice, tradePricingType]);

	const handleTradePricingListAt = useCallback(
		(listAt: number): void => {
			dispatch(setValue({ listAt }));
		},
		[dispatch]
	);

	return (
		<PriceAboveAverage>
			{tradePricingType === 'market' && (
				<PriceAboveAverageHeading>
					Percent above market rate your offer will list at
				</PriceAboveAverageHeading>
			)}
			{tradePricingType === 'fixed' && (
				<PriceAboveAverageHeading>
					Price your offer will list at
				</PriceAboveAverageHeading>
			)}
			<PriceAboveAverageRow>
				{tradePricingType === 'market' && (
					<MinusPlusInput
						symbol="%"
						initialValue={listAt}
						step={0.1}
						changeNumber={handleTradePricingListAt}
						min={0}
						buttons
						disableInput
						fitContent
						width="80px"
					/>
				)}
				{tradePricingType === 'fixed' && (
					<MinusPlusInput
						symbol={fiat.symbol}
						initialValue={currentPrice}
						step={100}
						changeNumber={handleTradePricingListAt}
						min={0}
						buttons
						disableInput
						fitContent
						width="80px"
					/>
				)}
				<PriceAboveAverageSpan>on each sale</PriceAboveAverageSpan>
			</PriceAboveAverageRow>
			{tradePricingType === 'market' && (
				<PriceAboveAverageStatement>
					Current {cryptocurrency?.name} market price:{' '}
					<strong>{`${currentPrice} ${fiat?.symbol}`}</strong>.
				</PriceAboveAverageStatement>
			)}
		</PriceAboveAverage>
	);
};

export default ListAt;
