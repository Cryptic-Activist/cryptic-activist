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
		theme.sections.offer.create.paymentMethod.heading.color};
	@media (max-width: 768px) {
		font-size: 28px;
	}
`;

export const Choose = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const ChooseHeading = styled.h2`
	font-size: 18px;
	color: ${({ theme }) =>
		theme.sections.offer.create.paymentMethod.heading.color};
`;

export const WhatWouldYouLike = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

export const WhatWouldYouLikeHeading = styled.h2`
	font-size: 18px;
	color: ${({ theme }) =>
		theme.sections.offer.create.paymentMethod.heading.color};
`;

export const SelectPaymentMethodDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

export const SelectPaymentMethodHeading = styled.h2`
	font-size: 24px;
	color: ${({ theme }) =>
		theme.sections.offer.create.paymentMethod.heading.color};
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
		theme.sections.offer.create.paymentMethod.about.heading.color};
	@media (max-width: 991px) {
		font-size: 26px;
	}
`;

export const StatementDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const Statement = styled.p`
	color: ${({ theme }) =>
		theme.sections.offer.create.paymentMethod.about.statement.color};
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
