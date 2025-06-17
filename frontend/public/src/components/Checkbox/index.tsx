import React, { FC } from 'react';

import { CheckboxProps } from './types';
import styles from './index.module.scss';

const Checkbox: FC<CheckboxProps> = ({
  checked,
  label,
  id,
  onClick,
  register,
  disabled,
  name,
  required,
}) => {
  const checkedStyle = checked ? styles.checked : '';

  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.container}
      id={id}
      {...(register && {
        ...register(name, {
          required: required,
          disabled: disabled,
        }),
      })}
    >
      <div className={`${styles.checkbox} ${checkedStyle}`}>
        <div />
      </div>
      <label htmlFor={id}>{`${label} ${required ? ' *' : ''}`}</label>
    </button>
  );
};

export default Checkbox;
