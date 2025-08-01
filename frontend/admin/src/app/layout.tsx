import './global.css';

import { BannerDisplay, QueryProvider } from '@/components';

import AllModals from '@/layout/modals/AllModals';
import Footer from '@/layout/Footer';
import Head from 'next/head';
import { InitialSettings } from '@/layout';
import { Montserrat } from 'next/font/google';
import NavigationBar from '@/layout/NavigationBar';
import SideBar from '@/layout/SideBar';
import layout from './layout.module.scss';

const montserrat = Montserrat({ subsets: ['latin'], weight: '400' });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<head />
			<Head>
				<title>Admin | Cryptic Activist Catalog</title>
			</Head>
			<body className={montserrat.className}>
				<QueryProvider>
					<AllModals />
					<InitialSettings />
					<NavigationBar />
					<BannerDisplay />
					<main className={layout.main}>
						<SideBar />
						<div className={layout.container}>{children}</div>
					</main>
					<Footer />
				</QueryProvider>
			</body>
		</html>
	);
};

export default RootLayout;
