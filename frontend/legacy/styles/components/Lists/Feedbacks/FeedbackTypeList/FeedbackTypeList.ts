import styled from "styled-components";

export const Container = styled.div`
	width: 110px;
	height: 107px;
	background: ${({ theme }) =>
		theme.components.list.feedbacks.header.background};
	border: 1px solid
		${({ theme }) => theme.components.list.feedbacks.header.borderColor};
	border-radius: 4px;
	position: absolute;
	transform: translate(-39px, 81px);
	box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
	display: flex;
	flex-direction: column;
`;

export const Item = styled.button`
	width: 100%;
	height: 35px;
	background: transparent;
	border: none;
	font-size: 14px;
	color: ${({ theme }) => theme.components.list.feedbacks.header.color};
	&:focus {
		outline: none;
	}
`;
