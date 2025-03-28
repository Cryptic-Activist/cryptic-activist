import styled from 'styled-components';
import { TradeBtnProps } from './types';

export const Wrapper = styled.div`
	width: 100%;
`;

export const Container = styled.div`
	width: 1920px;
	height: 100%;
	padding: 25px 0;
	margin: 0 auto;
	@media (max-width: 2030px) {
		width: 95%;
	}
`;

export const NoOfferError = styled.h1`
	font-size: 20px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const Main = styled.main`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 25px;
`;

export const Abouts = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 20px;
	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		gap: 25px;
	}
`;

export const HowMuchWantTrade = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
	padding: 12px;
	background: ${({ theme }) => theme.pages.offer.id.howMuchTrade.background};
	box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
	border-radius: 4px;
	border: 1px solid
		${({ theme }) => theme.pages.offer.id.howMuchTrade.borderColor};
`;

export const HowMuchWantTradeHeading = styled.h1`
	font-size: 20px;
	color: ${({ theme }) => theme.pages.offer.id.howMuchTrade.heading.color};
	@media (max-width: 768px) {
		font-size: 18px;
	}
`;

export const HowMuchWantTradeInputRow = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 10px;
	width: 100%;
	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
`;

export const HowMuchWantTradeInputDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const HowMuchWantTradeInputLabel = styled.label`
	font-size: 14px;
	color: ${({ theme }) => theme.pages.offer.id.howMuchTrade.input.label.color};
`;

export const HowMuchWantTradeInputStatement = styled.p`
	font-size: 14px;
	color: ${({ theme }) => theme.pages.offer.id.howMuchTrade.statement.color};
	strong {
		color: ${({ theme }) =>
			theme.pages.offer.id.howMuchTrade.statement.strong.color};
		font-size: 14px;
	}
`;

export const WillReceive = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	border-radius: 4px;
	border: 1px solid
		${({ theme }) => theme.pages.offer.id.howMuchTrade.receive.borderColor};
	color: ${({ theme }) => theme.pages.offer.id.howMuchTrade.receive.color};
	height: 50px;
	width: 100%;
	p {
		width: 100%;
		text-align: center;
	}
`;

export const Symbol = styled.span`
	font-size: 16px;
	font-weight: 900;
	color: ${({ theme }) => theme.components.minusPlusInput.span.color};
	padding: 0 18px;
	border-left: 1px solid
		${({ theme }) => theme.components.minusPlusInput.span.borderColor};
	user-select: none;
`;

export const TradeBtn = styled.button<TradeBtnProps>`
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
	@media (max-width: 768px) {
		width: 100%;
	}
`;

export const AboutDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const AboutHeading = styled.h2`
	font-size: 18px;
	color: ${({ theme }) => theme.pages.offer.id.about.heading.color};
`;

export const AboutContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 25px;
	width: 100%;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
	border-radius: 4px;
	padding: 12px;
	border: 1px solid ${({ theme }) => theme.pages.offer.id.about.borderColor};
	background: ${({ theme }) => theme.pages.offer.id.about.background};
`;

export const AboutStatementSpanDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const AboutSpan = styled.span`
	font-size: 14px;
	color: ${({ theme }) => theme.pages.offer.id.about.span.color};
`;

export const AboutStatement = styled.p`
	font-size: 16px;
	color: ${({ theme }) => theme.pages.offer.id.about.statement.color};
`;

export const VendorProfile = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
`;

export const VendorNameLastSeenDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const VendorName = styled.strong`
	font-size: 16px;
	color: ${({ theme }) => theme.pages.offer.id.about.vendorProfile.name.color};
`;

export const VendorLastSeen = styled.p`
	font-size: 14px;
	color: ${({ theme }) =>
		theme.pages.offer.id.about.vendorProfile.lastSeen.color};
`;

export const FeedbacksDiv = styled.div`
	display: flex;
	flex-direction: row;
	gap: 25px;
`;

export const FeedbackDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const FeedbackSpan = styled.span`
	color: ${({ theme }) => theme.pages.offer.id.about.feedbacks.span.color};
	font-size: 14px;
`;

export const FeedbackRow = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
	svg {
		font-size: 20px;
	}
	.positive {
		color: ${({ theme }) =>
			theme.pages.offer.id.about.feedbacks.icon.positive.color};
	}
	.negative {
		color: ${({ theme }) =>
			theme.pages.offer.id.about.feedbacks.icon.negative.color};
	}
	strong {
		font-size: 18px;
		color: ${({ theme }) => theme.pages.offer.id.about.feedbacks.statement.color};
	}
`;
