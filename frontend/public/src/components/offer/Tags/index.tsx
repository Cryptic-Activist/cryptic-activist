'use client';

import React, { FC, useEffect, useState } from 'react';
import {
  convertArrayOfStringsToString,
  convertStringToArrayOfStrings,
} from '@/utils';

import { Input } from '@/components/forms';
import { TagsProps } from './types';
import styles from './index.module.scss';

const Tags: FC<TagsProps> = ({ createOffer, onChange }) => {
  const [tags, setTags] = useState(
    convertArrayOfStringsToString(createOffer.tags ?? [])
  );

  const handleTags = (value: string) => {
    setTags(value);
  };

  useEffect(() => {
    if (tags.length === 0) {
      onChange([]);
    } else {
      const convertedTags = convertStringToArrayOfStrings(tags);
      onChange(convertedTags);
    }
  }, [tags]);

  return (
    <div className={styles.inputContainer}>
      <Input
        type="text"
        name="tags"
        id="tags"
        label="Offer Tags"
        placeholder="Cash, Bank transfer, Bitcoin..."
        width="50%"
        onChange={handleTags}
        value={tags}
        style={styles.input}
      />
      <p className={styles.statement}>
        Select a maximum of 5 tags that best describe your offer terms.
      </p>
      {createOffer.tags && createOffer.tags.length > 0 && (
        <ul className={styles.tagsList}>
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
