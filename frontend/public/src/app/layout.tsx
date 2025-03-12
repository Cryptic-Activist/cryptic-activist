import './index.css';

import {
  AllModals,
  Footer,
  InitialSettings,
  NavigationBar,
  Toast,
} from '@/layouts';

import AllDrawers from '@/layouts/drawers/AllDrawers';
import { QueryProvider } from '@/components';
import { Roboto } from 'next/font/google';
import styles from './layout.module.scss';

const roboto = Roboto({ weight: '400', subsets: ['latin'], preload: true });

export const metadata = {
  title: 'Cryptic Actvist Catalog',
  description: 'P2P trade dApp',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>Cryptic Activist Catalog</title>
      </head>
      <body className={`${roboto.className} ${styles.body}`}>
        <QueryProvider>
          <InitialSettings />
          <AllModals />
          <AllDrawers />
          <NavigationBar />
          <Toast />
          <main className={styles.main}>{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
