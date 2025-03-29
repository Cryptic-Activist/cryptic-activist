import { toCapitalize } from '@/utils';
import { FC } from 'react';
import styles from './index.module.scss';
import { StatusProps } from './types';

const Status: FC<StatusProps> = ({ status }) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.status} ${styles[status]}`} />
      <p>{toCapitalize(status)}</p>
    </div>
  );
};

export default Status;
