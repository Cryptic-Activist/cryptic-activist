import { FC, useEffect, useState } from 'react';
import {
	FaArrowUp,
	FaCircle,
	FaExchangeAlt,
	FaHeart,
	FaInfo,
} from 'react-icons/fa';
import { IOffer } from 'types/components/Lists/Offers/Offer/Offer';

import Info from '@components/Buttons/Info';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
	AvgSpeed,
	Container,
	ContainerMobile,
	CryptoPrice,
	Description,
	DivMobile,
	From,
	FromMobile,
	Hearts,
	HeartsTrades,
	InfoIcon,
	Limit,
	LimitButtonDiv,
	LinkTo,
	LinkToMobile,
	Percent,
	PricePercentDivMobile,
	Rate,
	RateMobile,
	Status,
	Tags,
	Trades,
	Type,
	UsernameLink,
	WithFor,
	WithForMobile,
} from '@styles/components/Lists/Offers/Offer/Offer';

const Offer: FC<IOffer> = ({ offer }) => {
	const dispatch = useAppDispatch();
	const { app, user } = useAppSelector((state) => state);

	const [currentCryptocurrencyPrice, setCurrentCryptocurrencyPrice] =
		useState(0);

	useEffect(() => {
		if (offer?.tradePricingType === 'market' && app.currentPrice) {
			setCurrentCryptocurrencyPrice(app.currentPrice.data);
		}
	}, [offer, dispatch, app.currentPrice]);

	return (
		<>
			{app.isMobile ? (
				<ContainerMobile>
					<DivMobile>
						<FromMobile>
							<UsernameLink href={`/vendor/${offer.vendor.username}`}>
								{offer.vendor.username} {offer.vendor.id === user.data.id && '(you)'}
							</UsernameLink>

							<HeartsTrades>
								<Hearts>
									<FaHeart />
									<p>{offer?.feedbacks.length}</p>
								</Hearts>
								<Trades>
									<FaExchangeAlt />
									<p>{offer?.trades.length}</p>
								</Trades>
							</HeartsTrades>

							<Status>
								<FaCircle />
								<p>Seen 41 minutes ago</p>
							</Status>
						</FromMobile>
						<WithForMobile>
							<Type>{offer.tradeInstructionsLabel}</Type>
							<Description>{offer.tradeInstructionsTerms}</Description>
							<Tags>
								{offer.tradeInstructionsTags.map((tag) => (
									<span key={`${tag}`}>{tag}</span>
								))}
							</Tags>
						</WithForMobile>
						<Limit>{`Limits: ${offer.tradePricingTradeLimitsMin} - ${offer.tradePricingTradeLimitsMax} ${offer.fiat.symbol}`}</Limit>
					</DivMobile>
					<DivMobile>
						<RateMobile>
							<PricePercentDivMobile>
								<CryptoPrice>
									{offer.tradePricingType === 'fixed' && offer.tradePricingListAt}
									{offer.tradePricingType === 'market' && (
										<>
											{currentCryptocurrencyPrice > 0 &&
												(
													parseFloat((offer.tradePricingListAt / 100 + 1).toFixed(4)) *
													currentCryptocurrencyPrice
												).toFixed(2)}
										</>
									)}{' '}
									{offer.fiat.symbol}
								</CryptoPrice>
								{offer.tradePricingType === 'market' && (
									<Percent>
										<FaArrowUp />
										<p>{offer.tradePricingListAt}%</p>
										<InfoIcon>
											<FaInfo />
										</InfoIcon>
									</Percent>
								)}
							</PricePercentDivMobile>
							{offer.vendor.id !== user.data.id && (
								<LinkToMobile href={`/offer/${offer.id}`}>
									{app.type === 'buy' && 'Buy'}
									{app.type === 'sell' && 'Sell'}
								</LinkToMobile>
							)}
						</RateMobile>
					</DivMobile>
				</ContainerMobile>
			) : (
				<Container>
					<From>
						<UsernameLink href={`/vendor/${offer.vendor.username}`}>
							{offer.vendor.username} {offer.vendor.id === user.data.id && '(you)'}
						</UsernameLink>
						<HeartsTrades>
							<Hearts>
								<FaHeart />
								<p>{offer?.feedbacks.length}</p>
							</Hearts>
							<Trades>
								<FaExchangeAlt />
								<p>{offer?.trades.length}</p>
							</Trades>
						</HeartsTrades>
						<Status>
							<FaCircle />
							<p>Seen 41 minutes ago</p>
						</Status>
					</From>
					<WithFor>
						<Type>{offer.tradeInstructionsLabel}</Type>
						<Description>{offer.tradeInstructionsTerms}</Description>
						<Tags>
							{offer.tradeInstructionsTags.map((tag) => (
								<span key={`${tag}`}>{tag}</span>
							))}
						</Tags>
					</WithFor>
					<AvgSpeed>
						<p>Under a minute</p>
					</AvgSpeed>
					<Rate>
						<CryptoPrice>
							{offer.tradePricingType === 'fixed' && offer.tradePricingListAt}
							{offer.tradePricingType === 'market' && (
								<>
									{currentCryptocurrencyPrice > 0 &&
										(
											parseFloat((offer.tradePricingListAt / 100 + 1).toFixed(4)) *
											currentCryptocurrencyPrice
										).toFixed(2)}
								</>
							)}{' '}
							{offer.fiat.symbol}
						</CryptoPrice>
						{offer.tradePricingType === 'market' && (
							<Percent>
								<FaArrowUp id="up" />
								<p>{offer.tradePricingListAt}%</p>
								<Info
									message={`The asking price is ${offer.tradePricingListAt}% above the market price`}
								/>
							</Percent>
						)}
						<LimitButtonDiv>
							<Limit>{`Limits: ${offer.tradePricingTradeLimitsMin} - ${offer.tradePricingTradeLimitsMax} ${offer.fiat.symbol}`}</Limit>
							{offer.vendor.id !== user.data.id && (
								<LinkTo href={`/offer/${offer.id}`}>
									{app.type === 'buy' && 'Buy'}
									{app.type === 'sell' && 'Sell'}
								</LinkTo>
							)}
						</LimitButtonDiv>
					</Rate>
				</Container>
			)}
		</>
	);
};

export default Offer;
