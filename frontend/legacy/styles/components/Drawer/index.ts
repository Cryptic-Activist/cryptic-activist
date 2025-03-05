import Link from 'next/link';
import styled from 'styled-components';

interface Props {
	isProfileOpen?: boolean;
}

export const Background = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.25);
	z-index: 9;
`;

export const Container = styled.div`
	position: fixed;
	height: 100vh;
	width: 50vw;
	background: ${({ theme }) => theme.components.drawer.background};
	z-index: 10;
	border-right: 1px solid ${({ theme }) => theme.components.drawer.borderColor};
`;

export const List = styled.div`
	display: flex;
	flex-direction: column;
`;

export const ListItem = styled(Link)`
	font-size: 1rem;
	color: ${({ theme }) => theme.components.drawer.item.color};
	background: ${({ theme }) => theme.components.drawer.item.background};
	border: none;
	width: 100%;
	text-align: start;
	padding: 0.8rem 1rem;
	text-decoration: none;
	cursor: pointer;
	&:hover {
		background: ${({ theme }) => theme.components.drawer.item.hover.background};
	}
`;

export const Profile = styled.button<Pick<Props, 'isProfileOpen'>>`
	padding: 0.8rem 1rem;
	display: flex;
	flex-direction: row;
	gap: 1rem;
	align-items: center;
	width: 100%;
	cursor: pointer;
	border: none;
	background: ${({ theme, isProfileOpen }) =>
		isProfileOpen
			? theme.components.drawer.profileButton.active.background
			: theme.components.drawer.profileButton.background};
	&:hover {
		background: ${({ theme, isProfileOpen }) =>
			isProfileOpen
				? theme.components.drawer.profileButton.active.background
				: theme.components.drawer.profileButton.hover.background};
	}
`;

export const ProfileImage = styled.div`
	width: 3.5rem;
	height: 3.5rem;
	border-radius: 0.3rem;
	overflow: hidden;
	border: 1px solid
		${({ theme }) => theme.components.drawer.profileButton.img.borderColor};

	img {
		width: 100%;
		height: 100%;
	}
`;

export const ProfileNameUsername = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
	align-items: flex-start;
`;

export const ProfileName = styled.h2`
	font-size: 1.2rem;
	color: ${({ theme }) => theme.components.drawer.profileButton.name.color};
`;

export const ProfileUsername = styled.p`
	font-size: 1rem;
	color: ${({ theme }) => theme.components.drawer.profileButton.username.color};
`;

export const ProfileDropDownMenu = styled.div<Pick<Props, 'isProfileOpen'>>`
	display: flex;
	flex-direction: column;
	height: ${({ isProfileOpen }) => (isProfileOpen ? 'fit-content' : '0')};
	background: ${({ theme }) =>
		theme.components.drawer.profileDropDownMenu.background};
`;

export const ProfileDropDownMenuItem = styled(Link)`
	font-size: 1rem;
	color: ${({ theme }) =>
		theme.components.drawer.profileDropDownMenu.item.color};
	border: none;
	width: 100%;
	text-align: start;
	padding: 0.8rem 1rem;
	text-decoration: none;
	cursor: pointer;
	&:hover {
		background: ${({ theme }) =>
			theme.components.drawer.profileDropDownMenu.item.hover.background};
	}
`;

export const LoginLogout = styled.button`
	margin: 0.8rem 1rem;
	padding: 0.45rem 0.55rem;
	background: ${({ theme }) => theme.components.drawer.loginLogout.background};
	color: ${({ theme }) => theme.components.drawer.loginLogout.color};
	border: 1px solid
		${({ theme }) => theme.components.drawer.loginLogout.borderColor};

	font-size: 1rem;
	position: relative;
	border-radius: 4px;
	text-decoration: none;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
	cursor: pointer;
	user-select: none;
	&:focus {
		outline: none;
	}
`;
