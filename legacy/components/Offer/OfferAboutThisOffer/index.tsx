import useCryptocurrency from '@hooks/useCryptocurrency';
import {
	AboutContainer,
	AboutDiv,
	AboutHeading,
	AboutSpan,
	AboutStatement,
	AboutStatementSpanDiv,
} from '@styles/pages/Offer/Id';
import { FC } from 'react';
import { OfferAboutThisOfferProps } from './types';

const OfferAboutThisOffer: FC<OfferAboutThisOfferProps> = ({ offer }) => {
	const { currentPrice } = useCryptocurrency();
	return (
		<AboutDiv>
			<AboutContainer>
				<AboutStatementSpanDiv>
					<AboutHeading>About this offer</AboutHeading>

					<AboutSpan>
						{offer.tradePricingType === 'fixed' && 'Vendor prices'}
						{offer.tradePricingType === 'market' && 'Vendor fee'}
					</AboutSpan>
					<AboutStatement>
						{offer.tradePricingType === 'fixed' && (
							<strong>{`${offer.tradePricingListAt} ${offer.fiat.symbol}`}</strong>
						)}
						{offer.tradePricingType === 'market' && (
							<>
								<strong>
									{`${
										currentPrice > 0 &&
										(
											parseFloat((offer.tradePricingListAt / 100 + 1).toFixed(4)) *
											currentPrice
										).toFixed(2)
									} ${offer.fiat.symbol} - `}
								</strong>
								{`${offer.tradePricingListAt}% above market price`}
							</>
						)}
					</AboutStatement>
				</AboutStatementSpanDiv>
				<AboutStatementSpanDiv>
					<AboutSpan>Trade limit</AboutSpan>
					<AboutStatement>
						Min.{' '}
						<strong>
							{`${offer.tradePricingTradeLimitsMin} ${offer.fiat.symbol}`}
						</strong>{' '}
						- Max.{' '}
						<strong>
							{`${offer.tradePricingTradeLimitsMax} ${offer.fiat.symbol}`}
						</strong>
					</AboutStatement>
				</AboutStatementSpanDiv>
				<AboutStatementSpanDiv>
					<AboutSpan>Negociation time limit</AboutSpan>
					<AboutStatement>
						<strong>{`${offer.tradePricingTimeLimit} minutes`}</strong>
					</AboutStatement>
				</AboutStatementSpanDiv>
			</AboutContainer>
		</AboutDiv>
	);
};

export default OfferAboutThisOffer;
