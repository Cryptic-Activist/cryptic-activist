import styled from "styled-components";

interface Props {
	width: string;
	fitContent: boolean;
}

export const InputDiv = styled.div<Pick<Props, "fitContent">>`
	display: flex;
	flex-direction: row;
	align-items: center;
	border-radius: 4px;
	background: ${({ theme }) => theme.components.minusPlusInput.background};
	border: 1px solid ${({ theme }) => theme.components.minusPlusInput.borderColor};
	height: 50px;
	${({ fitContent }) => fitContent && "width: fit-content;"}
	overflow: hidden;
	.left {
		border-right: 1px solid
			${({ theme }) => theme.components.minusPlusInput.borderColor};
	}
	.right {
		border-left: 1px solid
			${({ theme }) => theme.components.minusPlusInput.borderColor};
	}
`;

export const Btn = styled.button`
	background: ${({ theme }) =>
		theme.components.minusPlusInput.button.background};
	border: none;
	padding: 0 18px;
	height: 100%;
	cursor: pointer;
	&:focus {
		outline: none;
	}
	svg {
		font-size: 16px;
		color: ${({ theme }) => theme.components.minusPlusInput.button.color};
	}
`;

export const Input = styled.input<Pick<Props, "width">>`
	background: transparent;
	color: ${({ theme }) => theme.components.minusPlusInput.input.color};
	border: none;
	font-size: 16px;
	width: ${({ width }) => width};
	height: 100%;
	text-align: center;
	&:focus {
		outline: none;
	}
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	/* Firefox */
	&[type="number"] {
		-moz-appearance: textfield;
	}
`;

export const Symbol = styled.span`
	font-size: 16px;
	font-weight: 900;
	color: ${({ theme }) => theme.components.minusPlusInput.span.color};
	padding: 0 18px;
	border-left: 1px solid
		${({ theme }) => theme.components.minusPlusInput.span.borderColor};
	user-select: none;
`;
