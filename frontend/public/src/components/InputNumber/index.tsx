'use client';

import { FaMinus, FaPlus } from 'react-icons/fa6';
import React, { FC, FormEvent, useEffect, useState } from 'react';

import { InputNumberProps } from './types';
import styles from './index.module.scss';

const InputNumber: FC<InputNumberProps> = ({
  onChange,
  value,
  step = 1,
  symbol,
  min,
  max,
  errorMessage,
  label,
  id,
  width,
}) => {
  const [localValue, setLocalValue] = useState('');

  const errorStyle = errorMessage ? styles.error : '';

  const handleOnChange = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const regex = /[^0-9.]/g;
    const sanitazed = value.replace(regex, '');
    setLocalValue(sanitazed);
  };

  useEffect(() => {
    if (value) {
      setLocalValue(value.toString());
    }
  }, [value]);

  useEffect(() => {
    const finalValue = parseFloat(localValue);

    if (!isNaN(finalValue)) {
      onChange(finalValue);
    }
  }, [localValue]);

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={`${styles.container} ${errorStyle}`}>
        <input
          type="number"
          className={styles.input}
          onChange={handleOnChange}
          value={localValue}
          min={min}
          max={max}
          id={id}
          style={{
            ...(width && { width: `${width} !important` }),
          }}
        />
        {symbol && <span className={styles.symbol}>{symbol}</span>}
      </div>
      {errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};

export default InputNumber;
