import styled from "styled-components";

export const SettingsBtn = styled.a`
	border: 1px solid ${({ theme }) => theme.components.buttons.link.borderColor};
	color: ${({ theme }) => theme.components.buttons.link.color};
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 30px;
	width: 30px;
	cursor: pointer;
	svg {
		font-size: 19px;
	}
`;
