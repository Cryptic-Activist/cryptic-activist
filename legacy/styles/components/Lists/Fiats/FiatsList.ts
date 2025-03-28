import styled from "styled-components";

export const Background = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	background: rgba(0, 0, 0, 0.25);
	z-index: 9999;
`;

export const Container = styled.div`
	background: ${({ theme }) => theme.components.list.fiats.background};
	border-radius: 4px;
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
	height: 500px;
	width: 350px;
	padding: 14px;
	position: fixed;
	transform: translate(-50%, -50%);
	top: 50%;
	left: 50%;
	z-index: 99999;
	display: flex;
	flex-direction: column;
	gap: 15px;
	@media (max-width: 370px) {
		width: 95%;
		height: 75vh;
	}
	@media (max-height: 550px) {
		height: 90vh;
	}
	@media (max-height: 400px) {
		height: 90vh;
	}
`;

export const HeadingCloseDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const Heading = styled.h1`
	font-size: 18px;
	color: ${({ theme }) => theme.components.list.fiats.h1.color};
`;

export const CloseBtn = styled.button`
	font-size: 18px;
	color: ${({ theme }) => theme.components.list.fiats.close.color};
	background: transparent;
	border: none;
	transform: rotate(45deg);
	cursor: pointer;
	&:focus {
		outline: none;
	}
`;

export const List = styled.ul`
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 5px;
		background: ${({ theme }) =>
			theme.components.list.fiats.list.scroll.track.background};
	}
	&::-webkit-scrollbar-thumb {
		background-color: ${({ theme }) =>
			theme.components.list.fiats.list.scroll.thumb.background};
		border-radius: 50px;
	}

	&::-webkit-scrollbar-thumb:active {
		background-color: ${({ theme }) =>
			theme.components.list.fiats.list.scroll.thumb.active.background};
	}
`;

export const Item = styled.li`
	display: flex;
	border-left: 2px solid transparent;
	cursor: pointer;
	&:hover {
		border-left: 2px solid
			${({ theme }) => theme.components.list.fiats.list.item.borderColor};
	}
	button {
		font-size: 16px;
		border: none;
		background: ${({ theme }) =>
			theme.components.list.fiats.list.item.background};
		color: ${({ theme }) => theme.components.list.fiats.list.item.color};
		padding: 10px;
		cursor: pointer;
		&:focus {
			outline: none;
		}
	}
`;

export const Empty = styled.p`
	font-size: 16px;
	color: ${({ theme }) => theme.components.list.fiats.list.item.color};
`;
