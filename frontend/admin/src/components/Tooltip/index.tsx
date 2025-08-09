'use client';

import { type FC, useState } from 'react';

import type { TooltipProps } from './types';
import styles from './index.module.scss';

const Tooltip: FC<TooltipProps> = ({ children, position, spacing }) => {
	const [isOpen, setIsOpen] = useState(false);

	const getSpacing = () => {
		if (!position || !spacing) return '';

		if (position === 'bottom') {
			return `translateY(${spacing}px)`;
		} else if (position === 'top') {
			return `translateY(-${spacing}px)`;
		} else if (position === 'left') {
			return `translateX(-${spacing}px)`;
		} else if (position === 'right') {
			return `translationX(${spacing}px)`;
		}
	};

	const onHoverToggle = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div
			className={styles.container}
			onMouseEnter={onHoverToggle}
			onMouseLeave={onHoverToggle}
		>
			{children[0]}
			<div className={styles.tooltip} style={{ transform: getSpacing() }}>
				{isOpen && children[1]}
			</div>
		</div>
	);
};

export default Tooltip;
