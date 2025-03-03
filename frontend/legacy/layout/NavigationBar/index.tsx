import Drawer from 'layout/Drawer';
import UserModal from 'layout/Modals/UserModal/UserModal';
import { FC } from 'react';
import { FaBars, FaWallet } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from 'store';
import {
	toggleDrawer,
	toggleModal,
	toggleTooltip,
} from 'store/reducers/navigationBar';

import VendorsSearch from '@components/Search/Vendors';
import { isLoggedIn } from '@utils/checkers';

import {
	BrandLink,
	ConnectWallet,
	Container,
	DrawerButton,
	LoadingDiv,
	Menu,
	MenuItem,
	MenuUserDiv,
	UserButton,
	UserDiv,
	WalletDiv,
	Wrapper,
} from '../../styles/components/NavigationBar';

const NavigationBar: FC = () => {
	const dispatch = useAppDispatch();
	const { app, user, wallet } = useAppSelector((state) => state);

	const { drawers, tooltips } = useAppSelector((state) => state.navigationBar);

	return (
		<>
			{app.isMobile && drawers.user && <Drawer />}
			<Wrapper>
				<Container>
					<BrandLink href="/" passHref>
						<h1>Cryptic Activist</h1>
						<h2>Catalog</h2>
					</BrandLink>
					<MenuUserDiv>
						{app.isMobile ? (
							<>
								<DrawerButton
									onClick={() => dispatch(toggleDrawer({ drawer: 'user' }))}
								>
									<FaBars />
								</DrawerButton>
							</>
						) : (
							<>
								<MenuUserDiv>
									<Menu>
										<VendorsSearch />
										<MenuItem id="homeLink" href="/" passHref>
											Home
										</MenuItem>
										<MenuItem id="vendorsLink" href="/vendors" passHref>
											Vendors
										</MenuItem>
									</Menu>
									<UserDiv>
										{isLoggedIn(user) && (
											<>
												{Object.entries(wallet.wallet).length > 0 &&
												!wallet.loading &&
												wallet.errors.length === 0 &&
												wallet.fetched &&
												!app.isMobile ? (
													<WalletDiv>
														<button
															type="button"
															id="toggleWallet"
															onClick={() => dispatch(toggleTooltip({ tooltip: 'wallet' }))}
														>
															<FaWallet />
														</button>
													</WalletDiv>
												) : (
													<ConnectWallet
														onClick={() => dispatch(toggleModal({ modal: 'blockchain' }))}
													>
														Connect Wallet
													</ConnectWallet>
												)}
												<UserButton
													onClick={() => dispatch(toggleTooltip({ tooltip: 'user' }))}
												>
													{user.data.names.firstName}
													{!app.isMobile && tooltips.user && <UserModal />}
												</UserButton>
											</>
										)}
										{user.loading && <LoadingDiv>Loading</LoadingDiv>}
										{!isLoggedIn(user) && (
											<UserButton
												id="loginButton"
												onClick={() => dispatch(toggleModal({ modal: 'login' }))}
												data-testid="navbar-login-button"
											>
												Login
											</UserButton>
										)}
									</UserDiv>
								</MenuUserDiv>
							</>
						)}
					</MenuUserDiv>
				</Container>
			</Wrapper>
		</>
	);
};

export default NavigationBar;
