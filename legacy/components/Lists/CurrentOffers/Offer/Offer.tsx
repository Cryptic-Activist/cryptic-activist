import { FC, useEffect, useState } from 'react';
import { FaArrowUp, FaInfo } from 'react-icons/fa';

import { useAppDispatch, useAppSelector } from '@store/index';
import {
	Container,
	Description,
	InfoIcon,
	LeftDiv,
	Limits,
	LinkTo,
	PeopleChosen,
	Percent,
	Price,
	RightDiv,
	Speed,
	TypeDescDiv,
	TypeName,
} from '@styles/components/Lists/CurrentOffers/Offer/Offer';

import { ICurrentOffer } from '../types';

const Offer: FC<ICurrentOffer> = ({ offer }) => {
	const dispatch = useAppDispatch();
	const { app, user, vendor } = useAppSelector((state) => state);

	const [currentCryptocurrencyPrice, setCurrentCryptocurrencyPrice] =
		useState<number>(0);

	useEffect(() => {
		if (offer?.tradePricingType === 'market' && app.currentPrice) {
			setCurrentCryptocurrencyPrice(app.currentPrice.data);
		}
	}, [offer]);

	return (
		<Container>
			{app.dimensions[0] <= 370 ? (
				<>
					<LeftDiv>
						<TypeDescDiv>
							<TypeName>{offer.tradeInstructionsLabel}</TypeName>
							<Description>{offer.tradeInstructionsTerms}</Description>
						</TypeDescDiv>
						<PeopleChosen>
							<span>65</span> people have chosen this offer
						</PeopleChosen>
						<Speed>
							<p>Speed:</p>
							<span>8 min</span>
						</Speed>
						<Limits>
							{`Limits: ${offer.tradePricingTradeLimitsMin} - ${offer.tradePricingTradeLimitsMax} ${offer.fiat.symbol}`}
						</Limits>
						<Price>
							{offer.tradePricingType === 'fixed' && offer.tradePricingListAt}
							{offer.tradePricingType === 'market' &&
								(
									parseFloat((offer.tradePricingListAt / 100 + 1).toFixed(4)) *
									currentCryptocurrencyPrice
								).toFixed(2)}{' '}
							{offer.fiat.symbol}
						</Price>
						{offer.tradePricingType === 'market' && (
							<Percent>
								<FaArrowUp />
								<p>{offer.tradePricingListAt}%</p>
								<InfoIcon>
									<FaInfo />
								</InfoIcon>
							</Percent>
						)}
						{user.data.id !== vendor.data.id && (
							<LinkTo href={`/offer/${offer.id}`}>
								{offer.paymentMethodType === 'buy' && 'Buy'}
								{offer.paymentMethodType === 'sell' && 'Sell'}
							</LinkTo>
						)}
					</LeftDiv>
				</>
			) : (
				<>
					<LeftDiv>
						<TypeDescDiv>
							<TypeName>{offer.tradeInstructionsLabel}</TypeName>
							<Description>{offer.tradeInstructionsTerms}</Description>
						</TypeDescDiv>
						<PeopleChosen>
							<span>65</span> people have chosen this offer
						</PeopleChosen>
					</LeftDiv>
					<RightDiv>
						<Price>
							{offer.tradePricingType === 'fixed' && offer.tradePricingListAt}
							{offer.tradePricingType === 'market' &&
								(
									parseFloat((offer.tradePricingListAt / 100 + 1).toFixed(4)) *
									currentCryptocurrencyPrice
								).toFixed(2)}{' '}
							{offer.fiat.symbol}
						</Price>
						{offer.tradePricingType === 'market' && (
							<Percent>
								<FaArrowUp />
								<p>{offer.tradePricingListAt}%</p>
								<InfoIcon>
									<FaInfo />
								</InfoIcon>
							</Percent>
						)}
						<Speed>
							<p>Speed:</p>
							<span>8 min</span>
						</Speed>
						<Limits>
							{`Limits: ${offer.tradePricingTradeLimitsMin} - ${offer.tradePricingTradeLimitsMax} ${offer.fiat.symbol}`}
						</Limits>
						{user.data.id !== vendor.data.id && (
							<LinkTo href={`/offer/${offer.id}`}>
								{offer.paymentMethodType === 'buy' && 'Buy'}
								{offer.paymentMethodType === 'sell' && 'Sell'}
							</LinkTo>
						)}
					</RightDiv>
				</>
			)}
		</Container>
	);
};

export default Offer;
