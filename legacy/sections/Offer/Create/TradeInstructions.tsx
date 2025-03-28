import Head from 'next/head';
import { FC, useEffect } from 'react';

import ProgressBar from '@components/ProgressBar/CreateOffer';

import {
	AboutDiv,
	AboutHeading,
	AboutStatement,
	AboutStatementDiv,
	Aside,
	Container,
	Heading,
	Main,
	NextBtn,
	TradeInstructionsDiv,
	TradeInstructionsHeading,
	Warning,
	Wrapper,
} from '@styles/sections/Offer/Create/TradeInstructions';

import {
	OfferInstructions,
	OfferLabel,
	OfferTags,
	OfferTerms,
} from '@components/Offer';
import { useAppDispatch, useAppSelector } from '@store/index';
import { setValue } from '@store/reducers/createOffer';
import { createOffer as createOfferThunk } from '@store/thunks/createOffer';

const TradeInstructions: FC = () => {
	const dispatch = useAppDispatch();
	const { app, createOffer, user } = useAppSelector((state) => state);

	const {
		isTradeInstructionsCompleted,
		tags,
		label,
		terms,
		instructions,
		isFilled,
	} = createOffer.data;

	const onSubmit = () => {
		if (isFilled) {
			dispatch(
				createOfferThunk({
					vendorId: user.data.id,
					fiat: createOffer.data.fiat,
					cryptocurrency: createOffer.data.cryptocurrency,
					paymentMethodType: createOffer.data.paymentMethodType,
					paymentMethodId: createOffer.data.selection,
					tradePricingType: createOffer.data.tradePricingType,
					tradePricingListAt: createOffer.data.listAt,
					tradePricingTradeLimitsMin: createOffer.data.limitMin,
					tradePricingTradeLimitsMax: createOffer.data.limitMax,
					tradePricingTimeLimit: createOffer.data.timeLimit,
					tradeInstructionsTags: createOffer.data.tags,
					tradeInstructionsLabel: createOffer.data.label,
					tradeInstructionsTerms: createOffer.data.terms,
					tradeInstructionsInstructions: createOffer.data.instructions,
				})
			);
		}
	};

	const checkSectionCompleted = () => {
		const isCompleted =
			tags.length > 0 &&
			label.length > 0 &&
			terms.length > 0 &&
			instructions.length > 0;

		dispatch(setValue({ isTradeInstructionsCompleted: isCompleted }));
	};

	useEffect(() => {
		checkSectionCompleted();
	}, [createOffer.data]);

	return (
		<Wrapper>
			<Head>
				<title>Trade Instructions | Create Offer - Cryptic Activist</title>
			</Head>
			<Container>
				<Main>
					<Heading>Create an Offer</Heading>

					<ProgressBar />

					<TradeInstructionsDiv>
						<TradeInstructionsHeading>
							Step 3: Trade instructions
						</TradeInstructionsHeading>
					</TradeInstructionsDiv>

					<OfferTags />

					<OfferLabel />

					<OfferTerms offerType={createOffer.data.paymentMethodType} />

					<OfferInstructions />
				</Main>
				<Aside>
					<AboutDiv>
						<AboutHeading>About the Trade Instructions</AboutHeading>
						<AboutStatementDiv>
							<AboutStatement>
								In this step you`ll be asked for the trade instructions of your offer.
							</AboutStatement>
							<AboutStatement>
								Write your trade instruction and finally finish the offer creation.
							</AboutStatement>
						</AboutStatementDiv>
						<NextBtn
							onClick={onSubmit}
							isCompleted={isTradeInstructionsCompleted}
							disabled={!isTradeInstructionsCompleted}
						>
							Create Offer
						</NextBtn>
						{app.warnings.length > 0 && (
							<>
								{app.warnings.map((warning) => (
									<Warning key={warning}>{warning}</Warning>
								))}
							</>
						)}
					</AboutDiv>
				</Aside>
			</Container>
		</Wrapper>
	);
};

export default TradeInstructions;
