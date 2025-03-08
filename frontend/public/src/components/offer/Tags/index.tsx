'use client';

import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { convertStringToArrayOfStrings, toCapitalize } from '@/utils';

import { TagsProps } from './types';
import styles from './index.module.scss';

const Tags: FC<TagsProps> = ({ createOffer, onChange, id, label, width }) => {
  const [tags, setTags] = useState('');

  const handleTags = (e: ChangeEvent<HTMLInputElement>) => {
    setTags(e.currentTarget.value);
  };

  useEffect(() => {
    if (tags.length === 0) {
      onChange([]);
    } else {
      const convertedTags = convertStringToArrayOfStrings(tags);
      onChange(convertedTags);
    }
  }, [tags]);

  console.log({ createOfferTags: createOffer.tags });

  return (
    <div className={styles.inputContainer}>
      {label && (
        <div className={styles.labelLinkContainer}>
          <label htmlFor={id} className={styles.label}>
            {toCapitalize(label)}
          </label>
        </div>
      )}
      <input
        className={styles.input}
        id={id}
        style={{ width }}
        onChange={handleTags}
        value={tags}
      />
      {createOffer.tags && createOffer.tags.length > 0 && (
        <ul className={styles.tagsList} style={{ width }}>
          {createOffer.tags.map((tag, index) => (
            <li key={index} className={styles.tagItem}>
              {tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tags;
