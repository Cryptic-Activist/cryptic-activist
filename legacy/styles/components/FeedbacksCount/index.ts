import styled from "styled-components";

export const Feedbacks = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	gap: 10px;
	@media (max-width: 400px) {
		flex-direction: column;
	}
`;

export const PositiveFeedback = styled.div`
	width: 210px;
	height: 75px;
	display: flex;
	padding: 12px 10px;
	flex-direction: row;
	justify-content: space-between;
	border-radius: 4px;
	border: 1px solid
		${({ theme }) =>
			theme.pages.account.index.main.feedbacks.positive.borderColor};
	background: ${({ theme }) =>
		theme.pages.account.index.main.feedbacks.positive.background};
	.numbers {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		strong {
			color: ${({ theme }) =>
				theme.pages.account.index.main.feedbacks.positive.color};
			font-weight: 900;
		}
		p {
			font-size: 13px;
			color: ${({ theme }) =>
				theme.pages.account.index.main.feedbacks.positive.p.color};
		}
	}
	.icon {
		display: flex;
		align-items: center;
		justify-items: center;
		svg {
			color: ${({ theme }) =>
				theme.pages.account.index.main.feedbacks.positive.color};
			font-size: 24px;
		}
	}
	@media (max-width: 400px) {
		width: 100%;
	}
`;

export const NegativeFeedback = styled.div`
	width: 210px;
	height: 75px;
	display: flex;
	padding: 12px 10px;
	flex-direction: row;
	justify-content: space-between;
	border-radius: 4px;
	border: 1px solid
		${({ theme }) =>
			theme.pages.account.index.main.feedbacks.negative.borderColor};
	background: ${({ theme }) =>
		theme.pages.account.index.main.feedbacks.negative.background};
	.numbers {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		strong {
			color: ${({ theme }) =>
				theme.pages.account.index.main.feedbacks.negative.color};
			font-weight: 900;
		}
		p {
			font-size: 13px;
			color: ${({ theme }) =>
				theme.pages.account.index.main.feedbacks.positive.p.color};
		}
	}
	.icon {
		display: flex;
		align-items: center;
		justify-items: center;
		svg {
			color: ${({ theme }) =>
				theme.pages.account.index.main.feedbacks.negative.color};
			font-size: 24px;
		}
	}
	@media (max-width: 400px) {
		width: 100%;
	}
`;
