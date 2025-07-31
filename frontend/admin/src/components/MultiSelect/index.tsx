'use client';

import React, { useEffect, useRef, useState } from 'react';

import styles from './styles.module.scss';

interface Option {
	value: string;
	label: string;
}

interface MultiSelectProps {
	options: Option[];
	selected: string[];
	onChange: (selected: string[]) => void;
	placeholder?: string;
}

const MultiSelect = ({
	options,
	selected,
	onChange,
	placeholder = 'Select pages'
}: MultiSelectProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const handleToggle = () => setIsOpen(!isOpen);

	const handleSelect = (value: string) => {
		const newSelected = selected.includes(value)
			? selected.filter((item) => item !== value)
			: [...selected, value];
		onChange(newSelected);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className={styles.multiSelectContainer} ref={ref}>
			<div className={styles.selectHeader} onClick={handleToggle}>
				{selected && selected.length > 0
					? `${selected.length} selected`
					: placeholder}
				<span className={`${styles.arrow} ${isOpen ? styles.open : ''}`}>
					&#x25BC;
				</span>
			</div>
			{isOpen && (
				<div className={styles.optionsContainer}>
					{options.map((option) => (
						<div
							key={option.value}
							className={styles.option}
							onClick={() => handleSelect(option.value)}
						>
							<input
								type="checkbox"
								checked={selected?.includes(option.value)}
								readOnly
							/>
							<span>{option.label}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default MultiSelect;
