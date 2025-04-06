'use client';

import { setLocalStorage } from '@/utils';
import styles from './index.module.scss';
import { useApp } from '@/hooks';

const TypeSelector = () => {
  const {
    setValue,
    app: { type },
  } = useApp();

  const selectType = () => {
    const newSelection = type === 'buy' ? 'sell' : 'buy';
    setValue({ type: newSelection }, 'app/setType');
    setLocalStorage('APP_TYPE', newSelection);
  };

  return (
    <div className={styles.container}>
      <button
        className={type === 'buy' ? styles.selected : ''}
        onClick={selectType}
      >
        Buy
      </button>
      <button
        className={type === 'sell' ? styles.selected : ''}
        onClick={selectType}
      >
        Sell
      </button>
    </div>
  );
};

export default TypeSelector;
