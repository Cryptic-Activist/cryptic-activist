import styled from 'styled-components';

export const SwitcherBtn = styled.button`
	background: ${({ theme }) => theme.components.switchers.theme.background};
	border: 1px solid
		${({ theme }) => theme.components.switchers.theme.borderColor};
	padding: 0 10px;
	border-radius: 0.4rem;
	width: fit-content;
	display: flex;
	flex-direction: row;
	align-items: center;
	box-shadow: 0 0 15px -5px rgba(0, 0, 0, 0.4);
	justify-content: space-evenly;
	cursor: pointer;
	&:focus {
		outline: none;
	}
`;

export const IconTextDiv = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	svg {
		color: ${({ theme }) => theme.components.switchers.theme.icon.color};
		transition: color 0.11s ease-in-out;
		font-size: 17px;
	}
`;
