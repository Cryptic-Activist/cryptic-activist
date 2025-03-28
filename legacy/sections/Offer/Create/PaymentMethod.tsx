import Head from 'next/head';
import { FC, useCallback, useEffect } from 'react';

import { IPaymentMethod } from 'types/pages/offer/create';

import Selector from '@components/Buttons/Selector';
import BuySell from '@components/BuySell';
import ProgressBar from '@components/ProgressBar/CreateOffer';
import SelectPaymentMethod from '@components/SelectPaymentMethod';

import { toggleSection } from '@store/reducers/createOffer';
import { resetCreate } from 'oldStore/actions/create';

import { useAppDispatch, useAppSelector } from '@store/index';
import { setValue } from '@store/reducers/createOffer';
import {
	AboutDiv,
	AboutHeading,
	Aside,
	Choose,
	ChooseHeading,
	Container,
	Heading,
	Main,
	NextBtn,
	SelectPaymentMethodDiv,
	SelectPaymentMethodHeading,
	Statement,
	StatementDiv,
	WhatWouldYouLike,
	WhatWouldYouLikeHeading,
	Wrapper,
} from '@styles/sections/Offer/Create/PaymentMethod';

const PaymentMethod: FC<IPaymentMethod> = () => {
	const dispatch = useAppDispatch();
	const { createOffer } = useAppSelector((state) => state);
	const {
		isPaymentMethodCompleted,
		cryptocurrency,
		paymentMethodType,
		fiat,
		category,
		selection,
	} = createOffer.data;

	const handleTradePricing = useCallback(() => {
		if (isPaymentMethodCompleted) {
			dispatch(toggleSection('tradePricing'));
		}
	}, [isPaymentMethodCompleted]);

	const handlePaymentMethodCategory = (categoryId: string): void => {
		dispatch(setValue({ category: categoryId }));
	};

	const handlePaymentMethodSelection = (selectionId: string): void => {
		dispatch(setValue({ selection: selectionId }));
	};

	const checkSectionCompleted = () => {
		const isCompleted =
			paymentMethodType !== null &&
			paymentMethodType.length > 0 &&
			cryptocurrency !== null &&
			fiat !== null &&
			category !== null &&
			selection !== null;

		dispatch(setValue({ isPaymentMethodCompleted: isCompleted }));
	};

	useEffect(() => {
		checkSectionCompleted();
	}, [createOffer.data]);

	useEffect(() => {
		dispatch(resetCreate());
	}, []);

	return (
		<>
			<Head>
				<title>Payment Method | Create Offer - Cryptic Activist</title>
			</Head>
			<Wrapper>
				<Container>
					<Main>
						<Heading>Create an Offer</Heading>

						<ProgressBar />

						<Choose>
							<ChooseHeading>Choose Fiat</ChooseHeading>
							<Selector modal="fiatsModal" type="create" />
						</Choose>

						<Choose>
							<ChooseHeading>Choose Cryptocurrency</ChooseHeading>
							<Selector modal="cryptocurrenciesModal" type="create" />
						</Choose>

						{cryptocurrency && (
							<WhatWouldYouLike>
								<WhatWouldYouLikeHeading>
									What would like to do?
								</WhatWouldYouLikeHeading>
								<BuySell />
							</WhatWouldYouLike>
						)}
						<SelectPaymentMethodDiv>
							<SelectPaymentMethodHeading>
								Step 1: Select a payment method
							</SelectPaymentMethodHeading>
							<SelectPaymentMethod
								handlePaymentMethodCategory={handlePaymentMethodCategory}
								handlePaymentMethodSelection={handlePaymentMethodSelection}
							/>
						</SelectPaymentMethodDiv>
					</Main>
					<Aside>
						<AboutDiv>
							<AboutHeading>About the Payment Method</AboutHeading>
							<StatementDiv>
								<Statement>
									In this step you’ll be asked for the payment method of your offer.{' '}
								</Statement>
								<Statement>
									Make your selection on payment method and move onto the next step.
								</Statement>
							</StatementDiv>
							<NextBtn
								onClick={handleTradePricing}
								isCompleted={createOffer.data.isPaymentMethodCompleted}
								disabled={!createOffer.data.isPaymentMethodCompleted}
							>
								Go the next step: Trade pricing
							</NextBtn>
						</AboutDiv>
					</Aside>
				</Container>
			</Wrapper>
		</>
	);
};

export default PaymentMethod;
