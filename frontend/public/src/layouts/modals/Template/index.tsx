'use client';

import { FC } from 'react';
import type { TemplateProps } from './types';
import styles from './index.module.scss';
import { useNavigationBar } from '@/hooks';

const Template: FC<TemplateProps> = ({
  children,
  width,
  heading,
  successMessage,
  allowClose = true,
  name,
}) => {
  const { resetNavigationBar, navigationBar } = useNavigationBar();

  const closeModal = () => {
    if (allowClose) {
      resetNavigationBar();
    }
  };

  const privateKeysStyle =
    name === 'privateKeys' ? styles.privateKeysContainer : '';

  const verifyAccountStyle =
    name === 'verifyAccount' ? styles.verifyAccountContainer : '';

  return (
    <>
      <div className={styles.bg} onClick={closeModal} />
      <div
        className={`${styles.container} ${privateKeysStyle} ${verifyAccountStyle}`}
        style={{ width }}
      >
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
