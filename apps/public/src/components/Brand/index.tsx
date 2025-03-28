import type { BrandProps } from './types';
import { FC } from 'react';
import Link from 'next/link';
import styles from './index.module.scss';

const Brand: FC<BrandProps> = ({ href = '/' }) => {
  return (
    <Link className={styles.brand} href={href}>
      <h1>Cryptic Activist</h1>
      <h2>Catalog</h2>
    </Link>
  );
};

export default Brand;
