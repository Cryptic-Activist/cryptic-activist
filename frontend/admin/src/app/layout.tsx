import './global.css';

import AllModals from '@/layout/modals/AllModals';
import Footer from '@/layout/Footer';
import { Montserrat } from 'next/font/google';
import NavigationBar from '@/layout/NavigationBar';
import { QueryProvider } from '@/components';
import SideBar from '@/layout/SideBar';
import layout from './layout.module.scss';

const montserrat = Montserrat({ subsets: ['latin'], weight: '400' });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<head />
			<body className={montserrat.className}>
				<QueryProvider>
					<AllModals />
					<NavigationBar />
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
