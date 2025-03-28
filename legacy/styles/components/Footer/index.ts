import styled from 'styled-components';
import Link from 'next/link';

export const FooterDiv = styled.footer`
	background: ${({ theme }) => theme.components.footer.background};
	border: none;
	border-top: 1px solid ${({ theme }) => theme.components.footer.borderColor};
	padding: 50px 0 10px 0;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
`;

export const Container = styled.div`
	width: 1920px;
	margin: 0px auto;
	display: flex;
	flex-direction: column;
	gap: 60px 20px;
	@media (max-width: 2030px) {
		width: 95%;
	}
`;

export const BrandQuickSettingsDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	@media (max-width: 450px) {
		flex-direction: column;
		gap: 25px;
		justify-content: space-evenly;
	}
`;

export const BrandDiv = styled.div`
	@media (max-width: 450px) {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
`;

export const BrandLink = styled(Link)`
	display: flex;
	flex-direction: column;
	line-height: 19px;
	transform: translateY(-2px);
	color: ${({ theme }) => theme.components.footer.brandName.color};
	cursor: pointer;
	text-decoration: none;
	h1 {
		font-size: 15px;
	}
	h2 {
		font-size: 25px;
	}
`;

export const ThemeSwitcherLanguageDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	gap: 5px;
	@media (max-width: 450px) {
		justify-content: center;
		height: 38px;
	}
`;

export const SubMenus = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	width: 100%;
	@media (max-width: 580px) {
		display: flex;
		flex-direction: column;
		gap: 40px;
	}
`;

export const SubMenu = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	@media (max-width: 580px) {
		align-items: center;
	}
`;

export const SubMenuHeading = styled.h4`
	font-size: 16px;
	font-weight: 900;
	color: ${({ theme }) => theme.components.footer.heading.color};
	width: fit-content;
	@media (max-width: 580px) {
		text-align: center;
	}
`;

export const SubMenuList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 7px;
	width: fit-content;
`;

export const SubMenuItem = styled.li`
	list-style: none;
	width: fit-content;
	a {
		color: ${({ theme }) => theme.components.footer.link.color};
		text-decoration: none;
		font-size: 14px;
	}
	@media (max-width: 580px) {
		margin: 0 auto;
	}
`;

export const Copyright = styled.p`
	font-size: 14px;
	color: ${({ theme }) => theme.components.footer.copyright.color};
	width: 100%;
	text-align: center;
	@media (max-width: 580px) {
		font-size: 13px;
	}
`;
