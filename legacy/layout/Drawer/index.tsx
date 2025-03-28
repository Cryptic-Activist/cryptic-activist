import { FC, useCallback, useState } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';

import {
	Background,
	Container,
	List,
	ListItem,
	Profile,
	ProfileImage,
	ProfileNameUsername,
	ProfileName,
	ProfileUsername,
	ProfileDropDownMenu,
	ProfileDropDownMenuItem,
	LoginLogout,
} from '@styles/components/Drawer';

import { IDrawer } from './types';

import WithUser from '@utils/hoc/withUser';
import {
	toggleModal,
	toggleDrawer,
	resetNavigationBar,
} from '@store/reducers/navigationBar';
import { logout } from '@store/reducers/user';

import Avatar from '@components/Avatar';
import { useAppDispatch, useAppSelector } from '@store/index';

const Drawer: FC = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state);

	const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

	const handleLoginModal = useCallback(() => {
		dispatch(toggleModal({ modal: 'login' }));
	}, []);

	const handleLogout = useCallback(() => {
		dispatch(logout());
	}, []);

	const handleClose = useCallback(() => {
		dispatch(toggleDrawer({ drawer: 'user' }));
	}, []);

	const handleOpenProfile = useCallback(() => {
		setIsProfileOpen(!isProfileOpen);
	}, [isProfileOpen]);

	const handleCloseDrawerOnRedirect = useCallback(() => {
		dispatch(resetNavigationBar());
	}, []);

	return (
		<>
			<Background onClick={handleClose} />
			<Container>
				<WithUser>
					<>
						<Profile onClick={handleOpenProfile} isProfileOpen={isProfileOpen}>
							<Avatar
								width="3.5rem"
								height="3.5rem"
								borderRadius="0.3rem"
								firstName={user.data.names?.firstName}
								lastName={user.data.names?.lastName}
								isProfilePage={false}
								profileColor={user.data.profileColor}
							/>
							<ProfileNameUsername>
								<ProfileName>
									{`${user.data.names?.firstName} ${user.data.names?.lastName}`}
								</ProfileName>
								<ProfileUsername>{user.data.username}</ProfileUsername>
							</ProfileNameUsername>
						</Profile>
						<ProfileDropDownMenu isProfileOpen={isProfileOpen}>
							<ProfileDropDownMenuItem
								onClick={handleCloseDrawerOnRedirect}
								href="/account"
								passHref
							>
								Account
							</ProfileDropDownMenuItem>
							<ProfileDropDownMenuItem
								onClick={handleCloseDrawerOnRedirect}
								href="/account/messages"
								passHref
							>
								Messages
							</ProfileDropDownMenuItem>
						</ProfileDropDownMenu>
					</>
					<></>
				</WithUser>
				<List>
					<ListItem onClick={handleCloseDrawerOnRedirect} href="/" passHref>
						Home
					</ListItem>
					<ListItem onClick={handleCloseDrawerOnRedirect} href="/vendors" passHref>
						Vendors
					</ListItem>
				</List>
				<WithUser>
					<LoginLogout onClick={handleLogout}>Logout</LoginLogout>
					<LoginLogout onClick={handleLoginModal}>Login</LoginLogout>
				</WithUser>
			</Container>
		</>
	);
};

export default Drawer;
