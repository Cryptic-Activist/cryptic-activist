import { NextPage } from 'next';

import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { wrapper } from 'store';

import Layout from 'layout/Layout';

import useTheme from '@hooks/useTheme';
import themes from '@styles/themes';

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
	const { theme, toggleTheme } = useTheme();

	return (
		<ThemeProvider theme={theme === 'light' ? themes.light : themes.dark}>
			<Layout theme={theme} toggleTheme={toggleTheme}>
				<Component {...pageProps} />
			</Layout>
		</ThemeProvider>
	);
};

export default wrapper.withRedux(App);
