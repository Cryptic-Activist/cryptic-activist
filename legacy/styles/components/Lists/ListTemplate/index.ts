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
	height: fit-content;
	max-height: 70%;
	width: 35rem;
	max-width: 90%;
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
