'use client';

import { useApp } from '@/hooks';
import { useEffect, useState } from 'react';

import styles from './index.module.scss';
import { Selected } from './types';

const TypeSelector = () => {
  const { setValue } = useApp();
  const [selected, setSelected] = useState<Selected>('buy');

  const selectType = () => {
    setSelected((prev) => (prev === 'buy' ? 'sell' : 'buy'));
  };

  useEffect(() => {
    setValue({ type: selected });
  }, [selected]);

  return (
    <div className={styles.container}>
      <button
        className={selected === 'buy' ? styles.selected : ''}
        onClick={selectType}
      >
        Buy
      </button>
      <button
        className={selected === 'sell' ? styles.selected : ''}
        onClick={selectType}
      >
        Sell
      </button>
    </div>
  );
};

export default TypeSelector;
