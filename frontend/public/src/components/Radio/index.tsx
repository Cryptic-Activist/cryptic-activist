'use client';

import { Item, RadioProps } from './types';
import React, { FC, useEffect, useState } from 'react';

import styles from './index.module.scss';

const Radio: FC<RadioProps> = ({
  items,
  onChange,
  orientation = 'vertical',
  value,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);

  const selectRadio = (item: Item, index: number) => {
    onChange(item);
    setSelectedIndex(index);
  };

  useEffect(() => {
    const index = items.findIndex((item) => item.value.includes(value));
    if (index > -1) {
      setSelectedIndex(index);
    }
  }, [value, items]);

  return (
    <ul className={`${styles.list} ${styles[orientation]}`}>
      {items.map((item, index) => {
        const isRadioSelected = index === selectedIndex;
        return (
          <li key={index}>
            <button
              className={styles.item}
              value={item.value}
              onClick={() => selectRadio(item, index)}
              type="button"
            >
              <span className={`${styles.radio}`}>
                {isRadioSelected && (
                  <div
                    className={isRadioSelected ? styles.selectedRadio : ''}
                  ></div>
                )}
              </span>
              <div className={styles.labelDescription}>
                <label className={styles.label}>{item.label}</label>
                {item.description && (
                  <p className={styles.description}>{item.description}</p>
                )}
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Radio;
