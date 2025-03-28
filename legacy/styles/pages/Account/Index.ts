import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
`;

export const Container = styled.div`
	width: 1920px;
	height: 100%;
	padding: 25px 0;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	gap: 20px;
	@media (max-width: 2030px) {
		width: 95%;
	}
	@media (max-width: 1350px) {
		flex-direction: column;
		margin: 24px auto;
		gap: 35px;
		padding: 0;
	}
`;

export const Flex = styled.div`
	display: flex;
	flex-direction: row;
	gap: 2rem;
	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

export const Aside = styled.aside`
	width: 16rem;
	height: fit-content;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	position: sticky;
	top: 1rem;
	@media (max-width: 768px) {
		position: relative;
		top: 0;
		width: 100%;
		margin: 0 auto;
	}
`;

export const Profile = styled.div`
	width: 100%;
	height: fit-content;
	display: flex;
	flex-direction: column;
	gap: 20px;
	@media (max-width: 768px) {
		flex-direction: column;
		position: relative;
		top: 0;
	}
	@media (max-height: 650px) {
		position: relative;
		top: 0;
	}
	@media (max-width: 574px) {
		flex-direction: column;
	}
`;

export const ProfileImage = styled.div`
	width: 245px;
	height: 245px;
	border-radius: 4px;
	border: 1px solid
		${({ theme }) => theme.pages.account.index.aside.profileImage.borderColor};
	box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.25);
	img {
		width: 100%;
		height: 100%;
	}
	@media (max-width: 768px) {
		width: 200px;
		height: 200px;
		img {
			width: 200px;
			height: 200px;
		}
	}
	@media (max-width: 574px) {
		margin: 0 auto;
	}
`;

export const Main = styled.main`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 35px;
`;

export const VendorNameUsername = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

export const InlineSettingsDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const VendorName = styled.h1`
	font-size: 32px;
	color: ${({ theme }) =>
		theme.pages.account.index.main.vendorNamesDescription.color};
	@media (max-width: 991px) {
		font-size: 30px;
	}
	@media (max-width: 850px) {
		font-size: 28px;
	}
	@media (max-width: 450px) {
		font-size: 26px;
	}
`;

export const VendorUsername = styled.h2`
	font-size: 16px;
	font-weight: 100;
	color: ${({ theme }) =>
		theme.pages.account.index.main.vendorNamesDescription.color};
`;

export const VendorDescription = styled.p`
	color: ${({ theme }) =>
		theme.pages.account.index.main.vendorNamesDescription.color};
	font-size: 16px;
	margin-top: 15px;
`;

export const Status = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	gap: 10px;
	align-items: center;
	.online {
		font-size: 14px;
		color: ${({ theme }) =>
			theme.pages.account.index.main.status.icon.online.color};
	}
	.offiline {
		font-size: 14px;
		color: ${({ theme }) =>
			theme.pages.account.index.main.status.icon.away.color};
	}
	p {
		font-size: 16px;
		color: ${({ theme }) =>
			theme.pages.account.index.main.status.statement.color};
	}
`;

export const CurrentOffersSection = styled.section`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export const CurrentOffersListHeading = styled.h2`
	font-size: 18px;
	color: ${({ theme }) => theme.pages.account.index.main.list.color};
`;

export const BtnsDiv = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
`;

export const FeedbacksListSection = styled.section`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export const FeedbacksListHeading = styled.h2`
	font-size: 18px;
	color: ${({ theme }) => theme.pages.account.index.main.list.color};
`;
