import styled from "styled-components";

export const Wrapper = styled.div`
	width: 100%;
`;

export const Container = styled.div`
	width: 1920px;
	height: 100%;
	padding: 25px 0;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	@media (max-width: 2030px) {
		width: 95%;
	}
`;

export const Heading = styled.h1`
	font-size: 1.6rem;
	color: ${({ theme }) => theme.pages.account.messages.heading.color};
`;

export const MessagesContainer = styled.div`
	display: flex;
	flex-direction: row;
	border-radius: 0.3rem;
	background: ${({ theme }) => theme.pages.account.messages.list.background};
	border: 1px solid
		${({ theme }) => theme.pages.account.messages.list.borderColor};
	height: 80vh;
	min-height: 95vh;
	/* .messagesList {
		display: flex;
		height: fit-content;
		overflow-y: auto;
	} */
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
	overflow-y: scroll;
	width: 30%;
	&::-webkit-scrollbar {
		display: none;
	}
	.firstMessage {
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
	.lastMessage {
		border-bottom-left-radius: 4px;
		button {
			border-bottom-left-radius: 4px;
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
