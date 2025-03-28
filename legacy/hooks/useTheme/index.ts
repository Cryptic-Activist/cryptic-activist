import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@store/index';
import { setTheme as setAppTheme } from 'store/reducers/app';
import { getLocalStorage, setLocalStorage } from '@utils/browser';

const useTheme = () => {
	const [theme, setTheme] = useState<'light' | 'dark'>('light');

	const dispatch = useAppDispatch();

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');

		if (theme === 'dark') {
			dispatch(setAppTheme('dark'));
		} else if (theme === 'light') {
			dispatch(setAppTheme('light'));
		}
	};

	useEffect(() => {
		const storedTheme = getLocalStorage('theme');
		const hasTheme = storedTheme === 'light' || storedTheme === 'dark';

		if (hasTheme) {
			setTheme(storedTheme);
		} else {
			setLocalStorage('theme', theme);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('theme', theme);
	}, [theme]);

	return { theme, toggleTheme };
};

export default useTheme;
