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
		theme.sections.offer.create.tradeInstructions.heading.color};
`;

export const TradeInstructionsDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

export const TradeInstructionsHeading = styled.h2`
	font-size: 24px;
	color: ${({ theme }) =>
		theme.sections.offer.create.tradeInstructions.heading.color};
`;

export const LabelInputDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const Label = styled.label`
	font-size: 18px;
	color: ${({ theme }) =>
		theme.sections.offer.create.tradeInstructions.label.color};
	font-weight: 900;
`;

export const TextArea = styled.textarea`
	font-size: 16px;
	color: ${({ theme }) =>
		theme.sections.offer.create.tradeInstructions.input.color};
	background: ${({ theme }) =>
		theme.sections.offer.create.tradeInstructions.input.background};
	border-radius: 4px;
	border: 1px solid
		${({ theme }) =>
			theme.sections.offer.create.tradeInstructions.input.borderColor};
	resize: none;
	width: 100%;
	height: 200px;
	padding: 14px;
	&:focus {
		outline: none;
		border: 1px solid
			${({ theme }) =>
				theme.sections.offer.create.tradeInstructions.input.focus.borderColor};
	}
`;

export const Input = styled.input`
	font-size: 16px;
	padding: 14px;
	height: 48px;
	color: ${({ theme }) =>
		theme.sections.offer.create.tradeInstructions.input.color};
	background: ${({ theme }) =>
		theme.sections.offer.create.tradeInstructions.input.background};
	border-radius: 4px;
	border: 1px solid
		${({ theme }) =>
			theme.sections.offer.create.tradeInstructions.input.borderColor};
	&:focus {
		outline: none;
		border: 1px solid
			${({ theme }) =>
				theme.sections.offer.create.tradeInstructions.input.focus.borderColor};
	}
	&::placeholder {
		color: ${({ theme }) =>
			theme.sections.offer.create.tradeInstructions.input.placeholder.color};
	}
`;

export const Statement = styled.p`
	font-size: 15px;
	color: ${({ theme }) =>
		theme.sections.offer.create.tradeInstructions.label.color};
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

export const AboutStatementDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const AboutStatement = styled.p`
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

export const TagsList = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
	span {
		background: ${({ theme }) =>
			theme.sections.offer.create.tradeInstructions.tagsList.background};
		border-radius: 4px;
		font-size: 14px;
		color: ${({ theme }) =>
			theme.sections.offer.create.tradeInstructions.tagsList.color};
		border: 1px solid
			${({ theme }) =>
				theme.sections.offer.create.tradeInstructions.tagsList.borderColor};
		padding: 4px 6px;
	}
`;

export const Warning = styled.span`
	font-size: 16px;
	color: ${({ theme }) => theme.components.warnings.p.color};
	background: ${({ theme }) => theme.components.warnings.p.color};
	padding: 7px 10px;
	border-radius: 4px;
	width: fit-content;
`;
