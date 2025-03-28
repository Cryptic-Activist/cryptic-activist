import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled.div`
	background: ${({ theme }) =>
		theme.components.list.feedbacks.feedback.background};
	border-top: 1px solid
		${({ theme }) => theme.components.list.feedbacks.feedback.borderColor};
	border-bottom: 1px solid
		${({ theme }) => theme.components.list.feedbacks.feedback.borderColor};
	margin-bottom: 5px;
	display: grid;
	grid-template-columns: 54px 0.7fr 2.6fr 0.4fr;
	grid-gap: 10px;
	padding: 20px 14px;
	@media (max-width: 768px) {
		grid-template-columns: 0.3fr 1fr;
	}
	@media (max-width: 510px) {
		grid-template-columns: 0.25fr 1fr;
	}
`;

export const MobileDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const ProfileImage = styled.div`
	width: 48px;
	height: 48px;
	border-radius: 4px;
	border: 1px solid
		${({ theme }) =>
			theme.components.list.feedbacks.feedback.profileImage.borderColor};
	box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.25);
	img {
		width: 100%;
		height: 100%;
	}
`;

export const UsernameDate = styled.div`
	display: flex;
	flex-direction: column;
	gap: 13px;
`;

export const Username = styled(Link)`
	color: ${({ theme }) =>
		theme.components.list.feedbacks.feedback.username.color};
	font-size: 1rem;
	cursor: pointer;
	text-decoration: none;
`;

export const OfferType = styled.a`
	color: ${({ theme }) =>
		theme.components.list.feedbacks.feedback.offerType.color};
	font-size: 16px;
	font-weight: 900;
	cursor: pointer;
`;

export const View = styled.a`
	color: ${({ theme }) => theme.components.list.feedbacks.feedback.view.color};
	font-size: 15px;
	float: right;
	cursor: pointer;
`;

export const Date = styled.p`
	color: ${({ theme }) => theme.components.list.feedbacks.feedback.date.color};
	font-size: 16px;
`;

export const FeedbackType = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 4px;
	svg {
		color: ${({ theme }) =>
			theme.components.list.feedbacks.feedback.feedback.positive.color};
		font-size: 18px;
	}
	span {
		color: ${({ theme }) =>
			theme.components.list.feedbacks.feedback.feedback.positive.color};
		font-size: 16px;
	}
`;

export const Message = styled.p`
	font-size: 16px;
	color: ${({ theme }) =>
		theme.components.list.feedbacks.feedback.message.color};
`;

export const OfferTypeMessage = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;
