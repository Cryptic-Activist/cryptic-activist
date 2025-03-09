'use client';

import React, { FC } from 'react';

import { Input } from '@/components/forms';
import { LabelProps } from './types';
import styles from './index.module.scss';

const Label: FC<LabelProps> = ({ createOffer, onChange }) => {
  const handleLabel = (value: string) => {
    onChange(value);
  };

  return (
    <div className={styles.inputContainer}>
      <Input
        type="text"
        name="label"
        id="label"
        label="Offer Label"
        placeholder="Label"
        onChange={handleLabel}
        value={createOffer.label ?? ''}
      />
      <p className={styles.statement}>
        Make your offer stand out to other users with a catchy label. Your label
        can be up to 40 characters long and can contain letters, numbers,
        apostrophe, and hyphen.
      </p>
    </div>
  );
};

export default Label;
