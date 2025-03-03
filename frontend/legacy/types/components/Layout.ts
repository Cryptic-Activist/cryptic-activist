import { ReactNode } from 'react';

export interface ILayout {
	children: ReactNode;
	theme: 'light' | 'dark';
	toggleTheme: () => void;
}
