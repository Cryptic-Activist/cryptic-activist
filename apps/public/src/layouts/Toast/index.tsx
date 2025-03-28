'use client';

import React, { FC, useEffect, useState } from 'react';

import styles from './index.module.scss';
import { useApp, useCountDown } from '@/hooks';
import { FaPlus } from 'react-icons/fa6';
import { ToastComponent } from './types';

const Toast: FC<ToastComponent> = ({ removeToast, toast }) => {
  const { startCountDown, timeLeftInMiliseconds } = useCountDown();
  const [timeLeftPercentage, setTimeLeftPercentage] = useState<null | number>(
    null
  );

  useEffect(() => {
    startCountDown(toast.timeout);
  }, []);

  useEffect(() => {
    const timeLeftPercentage = Math.round(
      (timeLeftInMiliseconds / toast.timeout) * 100
    );
    setTimeLeftPercentage(timeLeftPercentage);
  }, [timeLeftInMiliseconds]);

  return (
    <div className={`${styles.container} ${styles[toast.type]}`}>
      <button className={styles.closeBtn} onClick={() => removeToast(toast.id)}>
        <FaPlus size={16} />
      </button>
      <div className={styles.content}>{toast.content}</div>
      <span
        className={styles.countdownProgressBar}
        style={{
          width: timeLeftPercentage + '%',
        }}
      ></span>
    </div>
  );
};

const ToastList = () => {
  const { removeToast, app } = useApp();

  return (
    <div className={styles.wrapper}>
      {app.toasts.map((toast, index) => (
        <Toast key={index} removeToast={removeToast} toast={toast} />
      ))}
    </div>
  );
};

export default ToastList;
