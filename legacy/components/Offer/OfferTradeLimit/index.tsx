import MinusPlusInput from '@components/MinusPlusInput/MinusPlusInput';
import { useAppDispatch, useAppSelector } from '@store/index';
import { setValue } from '@store/reducers/createOffer';
import {
	MinMaxDiv,
	MinMaxRow,
	MinMaxSpan,
	OfferLimitDiv,
	OfferLimitHeading,
	OfferLimitStatement,
} from '@styles/sections/Offer/Create/TradePricing';
import { useCallback } from 'react';

const step = 10;

const OfferTradeLimit = () => {
	const dispatch = useAppDispatch();
	const { app, createOffer } = useAppSelector((state) => state);
	const { defaults } = app;
	const { limitMax, limitMin } = createOffer.data;
	const { cryptocurrency, fiat } = defaults;

	const handleTradePricingLimitMin = (limitMin: number): void => {
		dispatch(setValue({ limitMin: limitMin - step }));
	};

	const handleTradePricingLimitMax = useCallback(
		(limitMax: number): void => {
			dispatch(setValue({ limitMax }));
		},
		[dispatch]
	);

	return (
		<OfferLimitDiv>
			<OfferLimitHeading>Offer trade limits</OfferLimitHeading>
			<MinMaxRow>
				<MinMaxDiv>
					<MinMaxSpan>Minimum trade amount</MinMaxSpan>
					<MinusPlusInput
						changeNumber={handleTradePricingLimitMin}
						symbol={fiat?.symbol}
						initialValue={limitMin}
						step={step}
						min={limitMin}
						max={limitMax - step}
						buttons
						disableInput
						fitContent
						width="80px"
					/>
				</MinMaxDiv>
				<MinMaxDiv>
					<MinMaxSpan>Maximum trade amount</MinMaxSpan>
					<MinusPlusInput
						changeNumber={handleTradePricingLimitMax}
						symbol={fiat?.symbol}
						initialValue={limitMax}
						step={step}
						min={limitMin + step}
						buttons
						disableInput
						fitContent
						width="80px"
					/>
				</MinMaxDiv>
			</MinMaxRow>
			<OfferLimitStatement>
				Setting these limits will only allow people to start trades with you between
				you minimum and maximum trade amounts.
			</OfferLimitStatement>
			<OfferLimitStatement>
				Once a transaction is initiated, the exact trade equivalent in{' '}
				{cryptocurrency?.symbol} will be moved into escrow.
			</OfferLimitStatement>
		</OfferLimitDiv>
	);
};

export default OfferTradeLimit;
