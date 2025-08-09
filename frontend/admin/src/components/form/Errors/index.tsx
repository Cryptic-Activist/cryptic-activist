import type { FC } from 'react';
import type { ErrorsProps } from './types';

import styles from './styles.module.scss';

const Errors: FC<ErrorsProps> = ({ errors }) => {
  return (
    <ul className={styles.list}>
      {errors.map((error) => (
        <li className={styles.listItem}>{error}</li>
      ))}
    </ul>
  );
};

export default Errors;
