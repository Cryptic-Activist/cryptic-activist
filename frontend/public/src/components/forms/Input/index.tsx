'use client';

import { FC } from 'react';

import { toCapitalize } from '@/utils';

import styles from './index.module.scss';
import type { InputProps } from './types';

const Input: FC<InputProps> = ({
  register,
  name,
  id,
  required,
  disabled,
  label,
  sideButton,
  type,
  errorMessage,
  width,
  focus = true,
  ...rest
}) => (
  <div className={styles.inputContainer}>
    {id && id.length && label && type !== 'hidden' && (
      <div className={styles.labelLinkContainer}>
        <label htmlFor={id} className={styles.label}>
          {`${toCapitalize(label)} ${required && '*'}`}
        </label>
        {sideButton}
      </div>
    )}
    <input
      className={styles.input}
      {...register(name, {
        required: required,
        disabled: disabled,
      })}
      type={type}
      id={id}
      style={{
        width,
        ...(focus && { borderColor: '#000' }),
      }}
      {...rest}
    />
    {errorMessage && (
      <span className={styles.errorMessage}>{errorMessage.toString()}</span>
    )}
  </div>
);

export default Input;
