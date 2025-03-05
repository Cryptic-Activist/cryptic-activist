import styled from 'styled-components';

export const LanguageBtn = styled.button`
	background: ${({ theme }) => theme.components.switchers.language.background};
	border: 1px solid
		${({ theme }) => theme.components.switchers.language.borderColor};
	border-radius: 0.4rem;
	box-shadow: 0 0 15px -5px rgba(0, 0, 0, 0.4);
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	padding: 0 10px;
	cursor: pointer;
	&:focus {
		outline: none;
	}
	svg {
		color: ${({ theme }) => theme.components.switchers.language.icon.color};
	}
`;

export const IconTextDiv = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	padding-right: 10px;
`;

export const BtnText = styled.p`
	font-size: 14px;
	padding-left: 5px;
	color: ${({ theme }) => theme.components.switchers.language.color};
`;
