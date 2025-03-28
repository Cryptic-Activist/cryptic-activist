'use client';

import { ChangeEvent, FC } from 'react';

import type { InputProps } from './types';
import styles from './index.module.scss';
import { toCapitalize } from '@/utils';

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
  onChange,
  ...rest
}) => {
  const handleChange = (event: ChangeEvent<any>) => {
    if (onChange) {
      const value = event.currentTarget.value;
      onChange(value);
    }
  };

  return (
    <div className={styles.inputContainer}>
      {id && id.length && label && type !== 'hidden' && (
        <div className={styles.labelLinkContainer}>
          <label htmlFor={id} className={styles.label}>
            {`${toCapitalize(label)}${required ? ' *' : ''}`}
          </label>
          {sideButton}
        </div>
      )}
      <input
        className={styles.input}
        {...(register && {
          ...register(name, {
            required: required,
            disabled: disabled,
          }),
        })}
        type={type}
        id={id}
        style={{
          width,
          ...(focus && { borderColor: '#000' }),
        }}
        {...(onChange && { onChange: handleChange })}
        {...rest}
      />
      {errorMessage && (
        <span className={styles.errorMessage}>{errorMessage.toString()}</span>
      )}
    </div>
  );
};

export default Input;
