import Footer from 'layout/Footer';
import LoginForm from 'layout/Modals/LoginForm';
import PrivateKeys from 'layout/Modals/PrivateKeys/PrivateKeys';
import RegisterForm from 'layout/Modals/RegisterForm/RegisterForm';
import ResetPasswordForm from 'layout/Modals/ResetPasswordForm/ResetPasswordForm';
import SelectBlockchain from 'layout/Modals/SelectBlockchain/SelectBlockchain';
import VerifyAccount from 'layout/Modals/VerifyAccount/VerifyAccount';
import WalletModal from 'layout/Modals/WalletModal/WalletModal';
import NavigationBar from 'layout/NavigationBar';
import Head from 'next/head';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { reset } from 'store/reducers/createOffer';

import { ILayout } from 'types/components/Layout';

import CryptocurrenciesList from '@components/Lists/Cryptocurrencies/CryptocurrenciesList';
import FiatsList from '@components/Lists/Fiats/FiatsList';
import PaymentMethodsList from '@components/Lists/PaymentMethods';
import useLayout from '@hooks/useLayout';
import useMoney from '@hooks/useMoney';
import useUser from '@hooks/useUser';
import { LayoutDiv } from '@styles/components/Layout';
import GlobalStyles from '@styles/global';

const Layout: FC<ILayout> = ({ children, theme, toggleTheme }) => {
	const dispatch = useAppDispatch();
	const { wallet } = useAppSelector((state) => state);
	const { user } = useUser(true);
	const { footerHeight } = useLayout();
	// const {} = useSocketIO();
	const {} = useMoney({ defaultFiat: 'USD', defaultCryptocurrency: 'bitcoin' });

	const { navigationBar, createOffer } = useAppSelector((state) => state);
	const { modals, tooltips } = navigationBar;
	const { hasCreated } = createOffer;

	useEffect(() => {
		if (hasCreated) {
			dispatch(reset());
		}
	}, [hasCreated]);

	return (
		<>
			<Head>
				<title>Cryptic Activist Catalog</title>
			</Head>
			{Object.entries(user.data).length === 0 ? (
				<>
					{modals.login && <LoginForm />}
					{modals.register && <RegisterForm />}
					{modals.verifyAccount && <VerifyAccount />}
					{modals.resetPassword && <ResetPasswordForm />}
					{modals.privateKeys && <PrivateKeys />}
				</>
			) : (
				<>
					{tooltips.wallet && <WalletModal />}
					{!wallet.wallet.address && modals.blockchain && <SelectBlockchain />}
				</>
			)}
			{modals.fiats && <FiatsList />}
			{modals.cryptocurrencies && <CryptocurrenciesList />}
			{modals.paymentMethods && <PaymentMethodsList />}
			<GlobalStyles />
			<NavigationBar />
			<LayoutDiv footerHeight={footerHeight}>{children}</LayoutDiv>
			<Footer theme={theme} toggleTheme={toggleTheme} />
		</>
	);
};

export default Layout;
