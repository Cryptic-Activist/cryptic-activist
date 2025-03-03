import styled from 'styled-components';

export const ProfileInfoContainer = styled.div`
	width: 16rem;
	display: flex;
	flex-direction: column;
	border: 1px solid
		${({ theme }) => theme.pages.account.index.aside.profileImage.borderColor};
	border-radius: 4px;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
	@media (max-width: 768px) {
		width: 100%;
	}
`;

export const ProfileInfoHeader = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	border-bottom: 1px solid
		${({ theme }) => theme.pages.account.index.aside.information.borderColor};
	background: ${({ theme }) =>
		theme.pages.account.index.aside.information.background};
	border-radius: 4px;
	padding: 10px 14px;
	h3 {
		font-size: 16px;
		color: ${({ theme }) => theme.pages.account.index.aside.information.color};
	}
`;

export const ProfileInfoList = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	@media (max-width: 768px) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(3, 1fr);
	}
	@media (max-width: 350px) {
		display: flex;
		flex-direction: column;
	}
`;

export const ProfileInfoListItem = styled.div`
	width: 100%;
	padding: 14px;
	color: ${({ theme }) => theme.pages.account.index.aside.information.color};
	.languages {
		display: flex;
		flex-direction: row;
		gap: 6px;
		flex-wrap: wrap;
		margin-top: 4px;
	}
`;
