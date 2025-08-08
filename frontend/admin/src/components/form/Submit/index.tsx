import type { FC } from 'react';
import type { SubmitProps } from './types';

import styles from './styles.module.scss';

const Submit: FC<SubmitProps> = ({ onClick, type, children }) => {
  const handleOnClick = () => {
    if (type === 'button' && onClick) {
      onClick();
    }
  };

  return (
    <button type={type} onClick={handleOnClick} className={styles.button}>
      {children}
    </button>
  );
};

export default Submit;
