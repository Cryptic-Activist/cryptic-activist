import styled from 'styled-components';
import Link from 'next/link';

export const Wrapper = styled.nav`
	background: ${({ theme }) => theme.components.navigationBar.background};
	border: none;
	height: 60px;
	border-bottom: 1px solid
		${({ theme }) => theme.components.navigationBar.borderColor};
	box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
`;

export const Container = styled.div`
	height: 60px;
	width: 1920px;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	@media (max-width: 2030px) {
		width: 95%;
	}
`;

export const BrandLink = styled(Link)`
	display: flex;
	flex-direction: column;
	line-height: 18px;
	transform: translateY(-2px);
	cursor: pointer;
	text-decoration: none;
	h1 {
		font-size: 13px;
		color: ${({ theme }) => theme.components.navigationBar.brandName.color};
	}
	h2 {
		font-size: 23px;
		color: ${({ theme }) => theme.components.navigationBar.brandName.color};
	}
`;

export const DrawerButton = styled.button`
	background: transparent;
	border: none;
	cursor: pointer;
	svg {
		font-size: 21px;
		color: ${({ theme }) => theme.components.navigationBar.drawer.color};
	}
	&:focus {
		outline: none;
	}
`;

export const MenuUserDiv = styled.div`
	display: flex;
	flex-direction: row;
	gap: 18px;
`;

export const Menu = styled.div`
	display: flex;
	flex-direction: row;
	gap: 6px;
	align-items: center;
`;

export const MenuItem = styled(Link)`
	font-size: 0.875rem;
	padding: 0.4rem 0.5rem;
	height: fit-content;
	background: ${({ theme }) => theme.components.navigationBar.link.background};
	color: ${({ theme }) => theme.components.navigationBar.link.color};
	border: 1px solid
		${({ theme }) => theme.components.navigationBar.link.borderColor};
	border-radius: 0.4rem;
	-webkit-text-decoration: none;
	text-decoration: none;
	cursor: pointer;
	user-select: none;
	text-decoration: none;
	box-shadow: 0 0 15px -5px rgba(0, 0, 0, 0.4);
	&:hover {
		transition: box-shadow 0.11s ease-in-out;
		box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
	}
`;

export const UserDiv = styled.div`
	display: flex;
	flex-direction: row;
	gap: 6px;
	align-items: center;
`;

export const UserButton = styled.button`
	font-size: 1rem;
	position: relative;
	padding: 0.6rem 0.6rem;
	color: ${({ theme }) => theme.components.navigationBar.user.color};
	background: ${({ theme }) => theme.components.navigationBar.user.background};
	border: 1px solid
		${({ theme }) => theme.components.navigationBar.user.borderColor};
	border-radius: 0.4rem;
	text-decoration: none;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
	cursor: pointer;
	user-select: none;
	height: fit-content;
	&:focus {
		outline: none;
	}
`;

export const LoadingDiv = styled.div`
	font-size: 1rem;
	padding: 0.4rem 0.5rem;
	color: ${({ theme }) => theme.components.navigationBar.user.color};
	background: ${({ theme }) => theme.components.navigationBar.user.background};
	border: 1px solid
		${({ theme }) => theme.components.navigationBar.user.borderColor};
	border-radius: 0.4rem;
	text-decoration: none;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
	cursor: pointer;
	user-select: none;
	&:focus {
		outline: none;
	}
`;

export const ConnectWallet = styled.button`
	position: relative;
	font-size: 14px;
	padding: 5px 7px;
	color: ${({ theme }) => theme.components.navigationBar.link.color};
	-webkit-text-decoration: none;
	text-decoration: none;
	cursor: pointer;
	user-select: none;
	display: flex;
	align-items: center;
	justify-content: center;
	background: transparent;
	border: none;
	svg {
		font-size: 18px;
	}
	&:focus {
		outline: none;
	}
`;

export const WalletDiv = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	#toggleWallet {
		font-size: 14px;
		padding: 5px 7px;
		color: ${({ theme }) => theme.components.navigationBar.link.color};
		-webkit-text-decoration: none;
		text-decoration: none;
		cursor: pointer;
		user-select: none;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		svg {
			font-size: 18px;
		}
		&:focus {
			outline: none;
		}
	}
`;
