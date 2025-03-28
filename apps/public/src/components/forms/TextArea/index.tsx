import React, { ChangeEvent, FC } from 'react';

import type { TextAreaProps } from './types';
import styles from './index.module.scss';
import { toCapitalize } from '@/utils';

const TextArea: FC<TextAreaProps> = ({
  onChange,
  value,
  id,
  info,
  label,
  required,
  errorMessage,
}) => {
  const handleWTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.currentTarget.value;

    onChange(newValue);
  };

  return (
    <div className={styles.inputContainer}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {`${toCapitalize(label)}${required ? ' *' : ''}`}
        </label>
      )}
      <textarea
        id={id}
        className={styles.textarea}
        onChange={handleWTextArea}
        value={value}
      />
      {info && <p className={styles.info}>{info}</p>}
      {errorMessage && (
        <span className={styles.errorMessage}>{errorMessage.toString()}</span>
      )}
    </div>
  );
};

export default TextArea;
