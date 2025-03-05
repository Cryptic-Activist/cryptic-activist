import { FaMinus, FaPlus } from 'react-icons/fa6';
import React, { FC, FormEvent } from 'react';

import { FaPercent } from 'react-icons/fa';
import { MinusPLusInputProps } from './types';
import { constrainedMemory } from 'process';
import styles from './index.module.scss';

const MinusPlusInput: FC<MinusPLusInputProps> = ({
  onChange,
  value,
  step = 1,
  symbol,
  min,
  max,
}) => {
  const handleOnChange = (event: FormEvent<HTMLInputElement>) => {
    const value = parseInt(event.currentTarget.value);

    onChange(isNaN(value) ? 0 : value);
  };

  const decreaseValue = () => {
    const newValue = value - step;

    if (min && newValue >= min) {
      onChange(newValue);
      return;
    }
    onChange(newValue);
  };

  const increaseValue = () => {
    const newValue = value + step;

    if (max && newValue <= max) {
      onChange(newValue);
      return;
    }
    onChange(newValue);
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={decreaseValue}>
        <FaMinus />
      </button>
      <input
        type="number"
        className={styles.input}
        onChange={handleOnChange}
        value={value}
        min={min}
        max={max}
      />
      <button className={styles.button} onClick={increaseValue}>
        <FaPlus />
      </button>
      {symbol && <span className={styles.symbol}>{symbol}</span>}
    </div>
  );
};

export default MinusPlusInput;
