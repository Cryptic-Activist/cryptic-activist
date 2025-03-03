import { NextPage } from 'next';

import { ICreateOffer } from 'types/pages/offer/create';

import PaymentMethod from '@sections/Offer/Create/PaymentMethod';
import TradeInstructions from '@sections/Offer/Create/TradeInstructions';
import TradePricing from '@sections/Offer/Create/TradePricing';

import useCreateOffer from '@hooks/useCreateOffer';

const Create: NextPage<ICreateOffer> = () => {
	const { section } = useCreateOffer();

	return (
		<>
			{section.paymentMethod && <PaymentMethod />}
			{section.tradePricing && <TradePricing />}
			{section.tradeInstructions && <TradeInstructions />}
		</>
	);
};

export default Create;
