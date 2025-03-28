import styled from 'styled-components';
import { NextButtonProps } from './types';

export const Wrapper = styled.div`
	width: 100%;
`;

export const Container = styled.div`
	width: 1920px;
	height: 100%;
	padding: 25px 0;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 2fr 1fr;
	grid-gap: 20px;
	@media (max-width: 2030px) {
		width: 95%;
	}
	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		gap: 40px;
	}
`;

export const Main = styled.main`
	display: flex;
	flex-direction: column;
	gap: 35px;
`;

export const Aside = styled.aside`
	display: flex;
	flex-direction: column;
	gap: 15px;
	height: 100%;
`;

export const Heading = styled.h1`
	font-size: 32px;
	color: ${({ theme }) =>
		theme.sections.offer.create.tradePricing.heading.color};
	@media (max-width: 768px) {
		font-size: 28px;
	}
`;

export const TradePricingDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const TradePricingHeading = styled.h2`
	font-size: 24px;
	color: ${({ theme }) =>
		theme.sections.offer.create.tradePricing.heading.color};
`;

export const TypeOfRateDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

export const TypeOfRateHeading = styled.h2`
	font-size: 18px;
	color: ${({ theme }) =>
		theme.sections.offer.create.tradePricing.typeOfRate.heading.color};
`;

export const PriceAboveAverage = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const PriceAboveAverageHeading = styled.h2`
	font-size: 18px;
	color: ${({ theme }) =>
		theme.sections.offer.create.tradePricing.priceAboveAverage.heading.color};
`;

export const PriceAboveAverageRow = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
	align-items: center;
	@media (max-width: 768px) {
		flex-direction: column;
		align-items: unset;
	}
`;

export const PriceAboveAverageSpan = styled.span`
	font-size: 14px;
	color: ${({ theme }) =>
		theme.sections.offer.create.tradePricing.priceAboveAverage.span.color};
`;

export const PriceAboveAverageStatement = styled.p`
	font-size: 15px;
	color: ${({ theme }) =>
		theme.sections.offer.create.tradePricing.priceAboveAverage.statement.color};
`;

export const OfferLimitDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const OfferLimitHeading = styled.h2`
	font-size: 18px;
	color: ${({ theme }) =>
		theme.sections.offer.create.tradePricing.offerLimit.heading.color};
`;

export const MinMaxRow = styled.div`
	display: flex;
	flex-direction: row;
	gap: 15px;
	@media (max-width: 768px) {
		flex-direction: column;
		gap: 10px;
	}
`;

export const MinMaxDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

export const MinMaxSpan = styled.span`
	font-size: 14px;
	color: ${({ theme }) =>
		theme.sections.offer.create.tradePricing.offerLimit.span.color};
`;

export const OfferLimitStatement = styled.p`
	font-size: 15px;
	color: ${({ theme }) =>
		theme.sections.offer.create.tradePricing.offerLimit.statement.color};
`;

export const OfferLimiTimetDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const OfferLimiTimetHeading = styled.h2`
	font-size: 18px;
	color: ${({ theme }) =>
		theme.sections.offer.create.tradePricing.offerLimitTime.heading.color};
`;

export const OfferLimitTimeStatement = styled.p`
	font-size: 15px;
	color: ${({ theme }) =>
		theme.sections.offer.create.tradePricing.offerLimitTime.statement.color};
`;

export const AboutDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	height: fit-content;
	position: sticky;
	top: 15px;
`;

export const AboutHeading = styled.h2`
	font-size: 26px;
	color: ${({ theme }) =>
		theme.sections.offer.create.tradePricing.about.heading.color};
	@media (max-width: 991px) {
		font-size: 26px;
	}
`;

export const AboutStatementDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const AboutStatement = styled.p`
	color: ${({ theme }) =>
		theme.sections.offer.create.tradePricing.about.statement.color};
	font-size: 16px;
`;

export const NextBtn = styled.button<NextButtonProps>`
	color: ${({ theme, isCompleted }) =>
		isCompleted
			? theme.sections.offer.create.paymentMethod.about.button.color
			: theme.sections.offer.create.paymentMethod.about.button.background};
	background: ${({ theme, isCompleted }) =>
		isCompleted
			? theme.sections.offer.create.paymentMethod.about.button.background
			: 'transparent'};
	border: 1px solid
		${({ theme }) =>
			theme.sections.offer.create.paymentMethod.about.button.borderColor};
	border-radius: 0.4rem;
	font-size: 1rem;
	padding: 0.8rem 1rem;
	width: fit-content;
	letter-spacing: 0.02rem;
	box-shadow: 0 0 20px -4px rgb(0 0 0 / 40%);
	${({ isCompleted }) => isCompleted && 'cursor: pointer;'}
	&:focus {
		outline: none;
	}
`;
