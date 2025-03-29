'use client';

import { useEffect, useState } from 'react';

import { Selected } from './types';
import styles from './index.module.scss';
import { useApp } from '@/hooks';

const TypeSelector = () => {
  const { setValue } = useApp();
  const [selected, setSelected] = useState<Selected>('buy');

  const selectType = () => {
    setSelected((prev) => (prev === 'buy' ? 'sell' : 'buy'));
  };

  useEffect(() => {
    setValue({ type: selected }, 'app/setType');
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
