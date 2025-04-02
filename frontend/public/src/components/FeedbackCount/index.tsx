import type { DialogProps, FeedbackCountProps } from './types';
import { FC, useCallback } from 'react';
import { FaHeart, FaHeartCrack, FaRegHeart } from 'react-icons/fa6';

import Tooltip from '../Tooltip';
import styles from './index.module.scss';

const Dialog: FC<DialogProps> = ({ message, style }) => (
  <div className={styles.dialogContainer}>
    <div className={`${styles.dialog} ${style}`}>{message}</div>
  </div>
);

const FeedbackCount: FC<FeedbackCountProps> = ({ feedbacksCount }) => {
  const countFeedbacks = useCallback(() => {}, []);

  return (
    <div className={styles.container}>
      <Tooltip position="top" spacing={50}>
        <div className={styles.positive}>
          <FaHeart size={20} />
          <span className={styles.count}>{feedbacksCount?.positive ?? 0}</span>
        </div>
        <Dialog message="Positive feedback" style={styles.positive} />
      </Tooltip>
      <Tooltip position="top" spacing={50}>
        <div className={styles.neutral}>
          <FaRegHeart size={20} />
          <span className={styles.count}>{feedbacksCount?.neutral ?? 0}</span>
        </div>
        <Dialog message="Neutral feedback" style={styles.neutral} />
      </Tooltip>
      <Tooltip position="top" spacing={50}>
        <div className={styles.negative}>
          <FaHeartCrack size={20} />
          <span className={styles.count}>{feedbacksCount?.positive ?? 0}</span>
        </div>
        <Dialog message="Negative feedback" style={styles.negative} />
      </Tooltip>
    </div>
  );
};

export default FeedbackCount;
