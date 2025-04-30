'use client';

import styles from './error.module.scss';

export default function Error() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Something went wrong!</h1>
    </div>
  );
}
