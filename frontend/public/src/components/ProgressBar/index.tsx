import React, { FC } from 'react';

import { ProgressBarProps } from './types';
import styles from './index.module.scss';

const ProgressBar: FC<ProgressBarProps> = ({ currentStep, steps }) => {
  return (
    <ul className={styles.list}>
      {steps.map((step, index) => {
        const currentStepClassname =
          currentStep === index ? styles.currentStep : '';
        const hasSeparator = index < steps.length - 1;
        return (
          <div className={styles.listItemWrapper} key={index}>
            <li className={`${styles.listItem} ${currentStepClassname}`}>
              <div className={`${styles.listItemNumber}`}>
                <span>{index + 1}</span>
              </div>
              <span className={styles.statement}>{step}</span>
            </li>
            {hasSeparator && <div className={styles.separator} />}
          </div>
        );
      })}
    </ul>
  );
};

export default ProgressBar;
