import React, { FC } from 'react';

import { CheckboxProps } from './types';
import styles from './index.module.scss';

const Checkbox: FC<CheckboxProps> = ({ checked, label, onClick }) => {
  const checkedStyle = checked ? styles.checked : '';

  return (
    <button type="button" onClick={onClick} className={styles.container}>
      <div className={`${styles.checkbox} ${checkedStyle}`}>
        <div />
      </div>
      <label>{label}</label>
    </button>
  );
};

export default Checkbox;
