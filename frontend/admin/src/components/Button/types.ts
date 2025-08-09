import type { ReactElement } from 'react';

export type Theme =
	| 'primary'
	| 'secondary'
	| 'ghost'
	| 'transparent'
	| 'danger';

export type ButtonProps = {
	type?: 'button' | 'submit';
	href?: string;
	children: string | string[] | ReactElement | ReactElement[];
	theme?: Theme;
	padding?: string;
	align?: 'left' | 'center' | 'right';
	size?: number;
	fullWidth?: boolean;
	isDisabled?: boolean;
	className?: string;
	onClick?: () => void;
};
