'use client';

import { FC } from 'react';

import { useNavigationBar } from '@/hooks';

import styles from './index.module.scss';
import type { TemplateProps } from './types';

const Template: FC<TemplateProps> = ({
  children,
  width,
  heading,
  successMessage,
  allowClose = true,
}) => {
  const { resetNavigationBar, navigationBar } = useNavigationBar();

  const closeModal = () => {
    if (allowClose) {
      resetNavigationBar();
    }
  };

  return (
    <>
      <div className={styles.bg} onClick={closeModal} />
      <div className={styles.container} style={{ width }}>
        {heading && <h1 className={styles.heading}>{heading}</h1>}
        {navigationBar.status === 'loading' ? (
          <p>Loading</p>
        ) : (
          <>{successMessage ? <p>{successMessage}</p> : { ...children }}</>
        )}
      </div>
    </>
  );
};

export default Template;
