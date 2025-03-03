import styled from "styled-components";

export const SelectorBtn = styled.button`
	border: 1px solid
		${({ theme }) => theme.components.buttons.selector.borderColor};
	background: ${({ theme }) => theme.components.buttons.selector.background};
	width: fit-content;
	padding: 12px 15px;
	border-radius: 4px;
	display: flex;
	flex-direction: row;
	gap: 7px;
	transition: border 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
	cursor: pointer;
	svg {
		font-size: 30px;
	}
	p {
		color: ${({ theme }) => theme.components.buttons.selector.color};
		font-size: 18px;
	}
	&:focus {
		outline: none;
	}
	&:hover {
		border: 1px solid
			${({ theme }) => theme.components.buttons.selector.hover.borderColor};
		box-shadow: 0px 1px 2px rgb(0, 0, 0, 0.25);
	}
`;
