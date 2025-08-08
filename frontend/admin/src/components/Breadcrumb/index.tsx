'use client';

import { capitalizePathname } from '@/utils/strings';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import Back from '../Buttons/Back';

import styles from './styles.module.scss';
import { BreadcrumbProps } from './types';

const Breadcrumb: FC<BreadcrumbProps> = ({ children }) => {
  const pathname = usePathname();
  const pathnameArray = pathname?.split('/');
  const splicedPathnameArray = pathnameArray?.splice(
    1,
    pathnameArray.length - 1
  );
  const capitalizedMapped = splicedPathnameArray?.map((path) =>
    capitalizePathname(path, '-')
  );
  const breadcrumbs = capitalizedMapped!.join(' | ');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {capitalizedMapped!.length > 1 ? (
          <div className={styles.pageBackHeading}>
            <Back />
            <h1 className={styles.breadcrumb}>{breadcrumbs}</h1>
          </div>
        ) : (
          <h1 className={styles.breadcrumb}>{breadcrumbs}</h1>
        )}
        {children}
      </header>
    </div>
  );
};

export default Breadcrumb;
