import TypeOfRate from '@components/TypeOfRate/TypeOfRate';
import { useAppSelector } from '@store/index';
import {
	TradePricingDiv,
	TradePricingHeading,
	TypeOfRateDiv,
	TypeOfRateHeading,
} from '@styles/sections/Offer/Create/TradePricing';

const OfferRate = () => {
	const { app } = useAppSelector((state) => state);
	const { defaults } = app;
	const { cryptocurrency } = defaults;

	return (
		<>
			<TradePricingDiv>
				<TradePricingHeading>Step 2: Trade Pricing</TradePricingHeading>
			</TradePricingDiv>
			<TypeOfRateDiv>
				<TypeOfRateHeading>
					Choose {cryptocurrency?.name} rate you want to use
				</TypeOfRateHeading>
				<TypeOfRate />
			</TypeOfRateDiv>
		</>
	);
};

export default OfferRate;
