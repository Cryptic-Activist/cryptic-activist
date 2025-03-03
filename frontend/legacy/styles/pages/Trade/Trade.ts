import styled from "styled-components";
import { Spin } from "@styles/animations";

export const Wrapper = styled.div`
	width: 100%;
`;

export const Container = styled.div`
	width: 1920px;
	height: 100%;
	padding: 25px 0;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	gap: 20px;
	@media (max-width: 2030px) {
		width: 95%;
	}
	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

export const Main = styled.main`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 25px;
	align-items: center;
	justify-content: center;
`;

export const LaodingChat = styled.div`
	animation: ${Spin} 0.5s linear infinite;
	svg {
		height: 2.5rem;
		width: 2.5rem;
	}
`;

export const Aside = styled.aside`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const TradeInstructions = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 30px;
	position: sticky;
	top: 25px;
	background: ${({ theme }) => theme.pages.trade.id.instructions.background};
	border: 1px solid
		${({ theme }) => theme.pages.trade.id.instructions.borderColor};
	box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
	border-radius: 4px;
	padding: 14px;
`;

export const TradeInstructionsHeading = styled.h2`
	font-size: 24px;
	color: ${({ theme }) => theme.pages.trade.id.instructions.heading.color};
`;

export const TradeInstructionsSections = styled.div`
	display: flex;
	flex-direction: column;
	gap: 30px;
`;

export const TradeInstructionsSection = styled.section`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const TradeInstructionsSpan = styled.span`
	font-size: 18px;
	color: ${({ theme }) => theme.pages.trade.id.instructions.span.color};
	font-weight: 900;
`;

export const TradeInstructionsStatement = styled.p`
	font-size: 15px;
	color: ${({ theme }) => theme.pages.trade.id.instructions.statement.color};
`;

export const Warning = styled.aside`
	font-size: 16px;
	background: ${({ theme }) =>
		theme.pages.trade.id.instructions.warning.background};
	color: ${({ theme }) => theme.pages.trade.id.instructions.warning.color};
	border: 1px solid
		${({ theme }) => theme.pages.trade.id.instructions.warning.borderColor};
	border-radius: 4px;
	padding: 7px;
`;

export const TradeInstructionsTags = styled.div`
	display: flex;
	flex-direction: row;
	gap: 7px;
	span {
		background: ${({ theme }) =>
			theme.pages.trade.id.instructions.tag.background};
		border-radius: 4px;
		font-size: 14px;
		color: ${({ theme }) => theme.pages.trade.id.instructions.tag.color};
		padding: 4px 6px;
	}
	@media (max-width: 670px) {
		flex-wrap: nowrap;
		overflow-y: scroll;
		&::-webkit-scrollbar {
			display: none;
		}
		span {
			flex: 0 0 auto;
		}
	}
`;

export const TradeInstructionsFinishCancelColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export const TradeInstructionsFinishCancelRow = styled.div`
	display: grid;
	grid-template-columns: 153px 1fr;
	grid-gap: 15px;
	@media (max-width: 768px) {
		grid-template-columns: unset;
		grid-template-rows: 66px 1fr;
	}
`;

export const FinishTradeBtn = styled.button`
	display: grid;
	grid-template-columns: 98px 20px;
	text-align: left;
	grid-gap: 15px;
	height: fit-content;
	width: fit-content;
	padding: 7px 9px;
	color: ${({ theme }) => theme.pages.trade.id.instructions.finish.color};
	background: ${({ theme }) =>
		theme.pages.trade.id.instructions.finish.background};
	border: 1px solid
		${({ theme }) => theme.pages.trade.id.instructions.finish.borderColor};
	border-radius: 4px;
	text-decoration: none;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
	cursor: pointer;
	user-select: none;
	&:focus {
		outline: none;
	}
	.iconDiv {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
	div {
		display: flex;
		flex-direction: column;
		gap: 1px;
		strong {
			font-size: 14px;
		}
		p {
			font-size: 12px;
		}
		svg {
			font-size: 18px;
		}
	}
`;

export const CancelTradeBtn = styled.button`
	padding: 7px 9px;
	color: ${({ theme }) => theme.pages.trade.id.instructions.cancel.color};
	background: ${({ theme }) =>
		theme.pages.trade.id.instructions.cancel.background};
	border: 1px solid
		${({ theme }) => theme.pages.trade.id.instructions.cancel.borderColor};
	font-size: 16px;
	border-radius: 4px;
	text-align: left;
	cursor: pointer;
	@media (max-width: 768px) {
		text-align: center;
	}
`;
