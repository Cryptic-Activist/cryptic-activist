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
  const [localValue, setLocalValue] = useState(value.toString());
  const [localErrorMessage, setLocalErrorMessage] = useState(errorMessage);

  const errorStyle = localErrorMessage?.length ? styles.error : '';

  const handleOnChange = (event: FormEvent<HTMLInputElement>) => {
    setLocalErrorMessage('');
    const value = event.currentTarget.value;
    const regex = /[^0-9.]/g;
    const sanitazed = value.replace(regex, '');
    const parsedValue = parseFloat(sanitazed);

    console.log({ value });
    if (value.length === 0) {
      setLocalErrorMessage('Invalid amount');
    }

    if (min) {
      if (parsedValue < min) {
        setLocalErrorMessage('Amount is below the allowed minimum');
      }
    }
    if (max) {
      if (parsedValue > max) {
        setLocalErrorMessage('Amount is above the allowed minimum');
      }
    }

    setLocalValue(sanitazed);
  };

  // useEffect(() => {
  //   if (value) {
  //     setLocalValue(value.toString());
  //   }
  // }, [localValue]);

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
          className={`${styles.input} ${styles.error}`}
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
      {localErrorMessage && (
        <span className={styles.errorMessage}>{localErrorMessage}</span>
      )}
    </div>
  );
};

export default InputNumber;
