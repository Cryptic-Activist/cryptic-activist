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
  title: 'Cryptic Activist Catalog',
  description: 'P2P trade dApp',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Cryptic Activist Catalog</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
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
}
