'use client';

import React, { FC, useState } from 'react';

import { DatePickerProps } from './types';
import { DayPicker } from 'react-day-picker';
import DynamicIcon from '@/components/DynamicIcon';
import styles from './index.module.scss';
import { useOutsideClick } from '@/hooks';

const DatePicker: FC<DatePickerProps> = ({
  selectedDate,
  placeholder,
  label,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const ref = useOutsideClick(toggleOpen);

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <button className={styles.btn} onClick={toggleOpen}>
        {selectedDate
          ? selectedDate.toDateString()
          : placeholder
          ? placeholder
          : 'Select a date'}
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
            className={styles.calendar}
            classNames={{
              button_previous: styles.btnPrevNext,
              button_next: styles.btnPrevNext,
              nav: styles.nav,
              day_button: styles.dayBtn,
              today: styles.today,
              selected: styles.selected,
              month_caption: styles.monthCaption,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
