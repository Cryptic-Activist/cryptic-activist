import styled from "styled-components";

interface Props {
	height?: string;
}

export const Container = styled.div<Pick<Props, "height">>`
	width: 100%;
	height: ${({ height }) => height};
	display: flex;
	flex-direction: column;
	background: ${({ theme }) => theme.components.list.feedbacks.background};
	border-radius: 4px;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
	border: 1px solid ${({ theme }) => theme.components.list.feedbacks.borderColor};
`;

export const Header = styled.div`
	width: 100%;
	height: 50px;
	border-radius: 4px;
	border-bottom: 1px solid
		${({ theme }) => theme.components.list.feedbacks.header.borderColor};
	background: ${({ theme }) =>
		theme.components.list.feedbacks.header.background};
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	z-index: 1;
`;

export const HeaderBtnDiv = styled.div`
	display: flex;
	flex-direction: row;
	.selected {
		background: ${({ theme }) =>
			theme.components.list.feedbacks.header.buttons.active.background};
		color: ${({ theme }) =>
			theme.components.list.feedbacks.header.buttons.active.color};
	}
`;

export const HeaderTitleLeft = styled.button`
	font-size: 14px;
	height: 100%;
	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;
	background: ${({ theme }) =>
		theme.components.list.feedbacks.header.buttons.deactive.background};
	color: ${({ theme }) =>
		theme.components.list.feedbacks.header.buttons.deactive.color};
	border: none;
	cursor: pointer;
	padding: 0px 14px;
	&:focus {
		outline: none;
	}
`;

export const HeaderTitle = styled.button`
	font-size: 14px;
	height: 100%;
	background: ${({ theme }) =>
		theme.components.list.feedbacks.header.buttons.deactive.background};
	color: ${({ theme }) =>
		theme.components.list.feedbacks.header.buttons.deactive.color};
	border: none;
	cursor: pointer;
	padding: 0px 14px;
	&:focus {
		outline: none;
	}
`;

export const MobileOpenFeedbacksBtn = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${({ theme }) =>
		theme.components.list.feedbacks.header.background};
	color: ${({ theme }) => theme.components.list.feedbacks.header.color};
	border: none;
	margin: 0 14px;
	&:focus {
		outline: none;
	}
	svg {
		font-size: 16px;
		transform: translateY(-2px);
	}
`;

export const AllPositiveNegativeDiv = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	.selected {
		font-weight: 900;
	}
`;

export const AllPositiveNegative = styled.button`
	border: none;
	font-size: 14px;
	padding: 0 14px;
	background: ${({ theme }) =>
		theme.components.list.feedbacks.header.background};
	color: ${({ theme }) => theme.components.list.feedbacks.header.color};
	cursor: pointer;
	&:focus {
		outline: none;
	}
`;

export const List = styled.div`
	background: ${({ theme }) =>
		theme.components.list.feedbacks.feedback.background};
	overflow-y: scroll;
	margin-top: -5px;
	padding-top: 8px;
	border-radius: 4px;
	&::-webkit-scrollbar {
		display: none;
	}
`;
