import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 25px;
`;

export const SearchDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

export const SearchLabel = styled.label`
	font-size: 16px;
	color: ${({ theme }) =>
		theme.components.selectPaymentMethod.search.label.color};
	font-weight: 900;
`;

export const SearchIconDiv = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	border: 1px solid
		${({ theme }) => theme.components.selectPaymentMethod.search.borderColor};
	background: ${({ theme }) =>
		theme.components.selectPaymentMethod.search.background};
	border-radius: 4px;
	height: 48px;
	button {
		border: none;
		background: transparent;
		width: 53px;
		height: 100%;
		&:focus {
			outline: none;
		}
		svg {
			color: ${({ theme }) =>
				theme.components.selectPaymentMethod.search.icon.color};
			cursor: pointer;
		}
	}
	input {
		width: 100%;
		height: 100%;
		border: none;
		border-radius: 4px;
		font-size: 16px;
		padding: 0 0 0 14px;
		background: ${({ theme }) =>
			theme.components.selectPaymentMethod.search.background};
		color: ${({ theme }) =>
			theme.components.selectPaymentMethod.search.input.color};
		&:focus {
			outline: none;
		}
		&::placeholder {
			color: ${({ theme }) =>
				theme.components.selectPaymentMethod.search.input.placeholder.color};
		}
	}
`;

export const ListDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const LabelsDiv = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr;
	span {
		font-size: 16px;
		font-weight: 900;
		color: ${({ theme }) =>
			theme.components.selectPaymentMethod.list.label.color};
	}
`;

export const List = styled.div`
	height: 317px;
	width: 100%;
	border-radius: 4px;
	border: 1px solid
		${({ theme }) => theme.components.selectPaymentMethod.list.borderColor};
	box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
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
