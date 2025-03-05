import styled from "styled-components";

export const InfoIcon = styled.button`
	width: 20px;
	height: 20px;
	background: transparent;
	border: 2px solid ${({ theme }) => theme.components.buttons.info.borderColor};
	border-radius: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 5px;
	cursor: pointer;
	&:focus {
		outline: none;
	}
	&:hover > #messageContainer {
		display: block;
	}
	svg {
		font-size: 10px;
		color: ${({ theme }) => theme.components.buttons.info.color};
	}
`;

export const Message = styled.div`
	display: none;
	width: fit-content;
	height: fit-content;
	position: absolute;
	padding: 0.25rem 0.4rem;
	border-radius: 0.2rem;
	transform: translateY(-2rem);
	background: ${({ theme }) => theme.components.buttons.info.message.background};
	border-color: ${({ theme }) =>
		theme.components.buttons.info.message.borderColor};
	#message {
		font-size: 1rem;
		color: ${({ theme }) => theme.components.buttons.info.message.color};
	}
`;
