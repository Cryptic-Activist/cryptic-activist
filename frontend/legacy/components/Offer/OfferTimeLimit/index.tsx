import MinusPlusInput from '@components/MinusPlusInput/MinusPlusInput';
import { useAppDispatch, useAppSelector } from '@store/index';
import { setValue } from '@store/reducers/createOffer';
import {
	OfferLimiTimetDiv,
	OfferLimiTimetHeading,
	OfferLimitTimeStatement,
} from '@styles/sections/Offer/Create/TradePricing';
import { useCallback } from 'react';

const OfferTimeLimit = () => {
	const dispatch = useAppDispatch();
	const { app, createOffer } = useAppSelector((state) => state);
	const { defaults } = app;
	const { timeLimit } = createOffer.data;

	const handleTradePricingTimeLimit = useCallback(
		(timeLimit: number): void => {
			dispatch(setValue({ timeLimit }));
		},
		[dispatch]
	);

	return (
		<OfferLimiTimetDiv>
			<OfferLimiTimetHeading>Offer time limit</OfferLimiTimetHeading>
			<MinusPlusInput
				changeNumber={handleTradePricingTimeLimit}
				symbol="Minutes"
				initialValue={timeLimit}
				step={1}
				min={10}
				buttons
				disableInput
				fitContent
				width="80px"
			/>
			<OfferLimitTimeStatement>
				This indicates the amount of time your trade partner has to make their
				payment. The trade will automatically be canceled if the buyers has not
				clicked “Paid” before the payment window expires.
			</OfferLimitTimeStatement>
		</OfferLimiTimetDiv>
	);
};

export default OfferTimeLimit;
