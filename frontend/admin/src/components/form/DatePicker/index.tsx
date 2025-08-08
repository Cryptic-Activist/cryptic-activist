'use client';

import { type FC, useState } from 'react';

import type { DatePickerProps } from './types';
import { DayPicker } from 'react-day-picker';
import DynamicIcon from '@/components/DynamicIcon';
import styles from './index.module.scss';
import { useOutsideClick } from '@/hooks';

const DatePicker: FC<DatePickerProps> = ({
	selectedDate,
	placeholder,
	label,
	onSelect
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleOpen = () => setIsOpen((prev) => !prev);
	const ref = useOutsideClick(() => setIsOpen(false));

	const currentYear = new Date().getFullYear();
	const minDate = new Date(currentYear - 100, 0, 1); // Jan 1, 100 years ago
	const maxDate = new Date(currentYear + 10, 11, 31); // Dec 31, 10 years ahead

	return (
		<div className={styles.container}>
			{label && <label className={styles.label}>{label}</label>}
			<button className={styles.btn} onClick={toggleOpen}>
				{selectedDate
					? selectedDate.toDateString()
					: placeholder ?? 'Select a date'}
				<DynamicIcon iconName="FaCalendarCheck" size={14} />
			</button>

			{isOpen && (
				<div ref={ref} className={styles.calendarRef}>
					<DayPicker
						mode="single"
						selected={selectedDate}
						onSelect={(date) => {
							onSelect(date);
							setIsOpen(false);
						}}
						captionLayout="dropdown"
						defaultMonth={selectedDate ?? new Date()}
						disabled={{
							before: minDate,
							after: maxDate
						}}
						className={styles.calendar}
						classNames={{
							button_previous: styles.btnPrevNext,
							button_next: styles.btnPrevNext,
							nav: styles.nav,
							day_button: styles.dayBtn,
							today: styles.today,
							selected: styles.selected,
							month_caption: styles.monthCaption,
							dropdown: styles.dropdown,
							caption_label: styles.captionLabel,
							months_dropdown: styles.selectMonthYear,
							years_dropdown: styles.selectMonthYear,
							dropdowns: styles.dropdowns
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default DatePicker;
