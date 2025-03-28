import Head from 'next/head';
import { FC, useCallback, useEffect } from 'react';

import { ITradePricing } from 'types/pages/offer/create';

import ProgressBar from '@components/ProgressBar/CreateOffer';

import { useAppDispatch, useAppSelector } from '@store/index';
import { setValue, toggleSection } from '@store/reducers/createOffer';
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
	Wrapper,
} from '@styles/sections/Offer/Create/TradePricing';

import ListAt from '@components/ListAt';
import { OfferRate, OfferTimeLimit, OfferTradeLimit } from '@components/Offer';

const TradePricing: FC<ITradePricing> = () => {
	const dispatch = useAppDispatch();
	const { createOffer } = useAppSelector((state) => state);
	const {
		isTradePricingCompleted,
		tradePricingType,
		listAt,
		limitMax,
		limitMin,
		timeLimit,
	} = createOffer.data;

	const handleTradeInstruction = useCallback((): void => {
		if (isTradePricingCompleted) {
			dispatch(toggleSection('tradeInstructions'));
		}
	}, [isTradePricingCompleted]);

	const checkSectionCompleted = () => {
		const isCompleted =
			(tradePricingType === 'fixed' || tradePricingType === 'market') &&
			listAt !== null &&
			limitMin > 0 &&
			limitMax > 0 &&
			timeLimit > 0;

		dispatch(setValue({ isTradePricingCompleted: isCompleted }));
	};

	useEffect(() => {
		checkSectionCompleted();
	}, [createOffer.data]);

	return (
		<Wrapper>
			<Head>
				<title>Trade Pricing | Create Offer - Cryptic Activist</title>
			</Head>
			<Container>
				<Main>
					<Heading>Create an Offer</Heading>
					<ProgressBar />
					<OfferRate />
					<ListAt />
					<OfferTradeLimit />
					<OfferTimeLimit />
				</Main>
				<Aside>
					<AboutDiv>
						<AboutHeading>About the Trade pricing</AboutHeading>
						<AboutStatementDiv>
							<AboutStatement>
								In this step you'll be asked for the trade pricing of your offer.
							</AboutStatement>
							<AboutStatement>
								Make your selection on trading prices and move onto the next step.
							</AboutStatement>
						</AboutStatementDiv>
						<NextBtn
							onClick={handleTradeInstruction}
							isCompleted={isTradePricingCompleted}
							disabled={!isTradePricingCompleted}
						>
							Go the next step: Trade instructions
						</NextBtn>
					</AboutDiv>
				</Aside>
			</Container>
		</Wrapper>
	);
};

export default TradePricing;
