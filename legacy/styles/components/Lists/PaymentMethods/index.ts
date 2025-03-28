import styled from 'styled-components';
import { ApplyButtonProps } from './types';

export const List = styled.div`
	height: 317px;
	width: 100%;
	border-radius: 4px;
	display: grid;
	grid-template-columns: 1fr 1px 2fr;
	background: ${({ theme }) =>
		theme.components.selectPaymentMethod.list.background};
	@media (max-width: 768px) {
		height: unset;
		display: flex;
		flex-direction: column;
	}
	ul::-webkit-scrollbar {
		display: none;
	}
`;

export const Sep = styled.div`
	width: 1px;
	height: 100%;
	display: block;
	background: ${({ theme }) =>
		theme.components.selectPaymentMethod.list.separator.background};
	@media (max-width: 768px) {
		width: 100%;
		height: 1px;
	}
`;

export const ItemsList = styled.ul`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	.firstCategory {
		border-top-left-radius: 4px;
		button {
			border-top-left-radius: 4px;
		}
		@media (max-width: 768px) {
			border-top-right-radius: 4px;
			button {
				border-top-right-radius: 4px;
			}
		}
	}
	.lastCategory {
		border-bottom-left-radius: 4px;
		button {
			border-bottom-left-radius: 4px;
		}
	}
	.firstPaymentMethod {
		border-top-right-radius: 4px;
		button {
			border-top-right-radius: 4px;
		}
	}
	.lastPaymentMethod {
		border-bottom-right-radius: 4px;
		button {
			border-bottom-right-radius: 4px;
		}
		@media (max-width: 768px) {
			border-bottom-left-radius: 4px;
			button {
				border-bottom-left-radius: 4px;
			}
		}
	}
	.selected {
		div {
			width: 2px;
			height: 100%;
			display: block;
			background: ${({ theme }) =>
				theme.components.selectPaymentMethod.list.items.selected.before.background};
		}
		button {
			width: 100%;
			height: 45px;
			text-align: left;
			padding: 0 14px 0 12px;
			border: none;
			background: ${({ theme }) =>
				theme.components.selectPaymentMethod.list.items.selected.background};
			font-weight: 900;
			font-size: 16px;
			cursor: pointer;
			&:focus {
				outline: none;
			}
		}
	}
`;

export const ItemsListItem = styled.li`
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 45px;
	background: ${({ theme }) =>
		theme.components.selectPaymentMethod.list.items.background};
`;

export const ItemsListItemBtn = styled.button`
	width: 100%;
	height: 45px;
	text-align: left;
	padding: 0 14px;
	border: none;
	background: ${({ theme }) =>
		theme.components.selectPaymentMethod.list.items.background};
	color: ${({ theme }) => theme.components.selectPaymentMethod.list.items.color};
	font-weight: 900;
	font-size: 16px;
	cursor: pointer;
	&:focus {
		outline: none;
	}
	&:hover {
		transition: background 0.15s ease-in-out;
		background: ${({ theme }) =>
			theme.components.selectPaymentMethod.list.items.hover.background};
	}
	&:active {
		transition: background 0.15s ease-in-out;
		background: ${({ theme }) =>
			theme.components.selectPaymentMethod.list.items.active.background};
	}
`;

export const EmptyP = styled.p`
	font-size: 15px;
	margin: 14px;
	color: ${({ theme }) => theme.components.selectPaymentMethod.list.items.color};
`;

export const Apply = styled.button<ApplyButtonProps>`
	color: ${({ theme, isCompleted }) =>
		isCompleted
			? theme.components.selectPaymentMethod.apply.isCompleted.color
			: theme.components.selectPaymentMethod.apply.color};
	background: ${({ theme, isCompleted }) =>
		isCompleted
			? theme.components.selectPaymentMethod.apply.isCompleted.background
			: 'transparent'};
	border: 1px solid
		${({ theme }) => theme.components.selectPaymentMethod.apply.borderColor};
	border-radius: 0.4rem;
	font-size: 1rem;
	padding: 0.8rem 1rem;
	width: fit-content;
	align-self: flex-end;
	letter-spacing: 0.02rem;
	box-shadow: 0 0 20px -4px rgb(0 0 0 / 40%);
	${({ isCompleted }) => isCompleted && 'cursor: pointer;'}
	&:focus {
		outline: none;
	}
`;
