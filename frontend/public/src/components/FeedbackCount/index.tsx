import { FC, useCallback } from 'react';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';

import type { FeedbackCountProps } from './types';
import styles from './index.module.scss';

const FeedbackCount: FC<FeedbackCountProps> = ({
  negativeCount,
  positiveCount,
}) => {
  const countFeedbacks = useCallback(() => {}, []);

  return (
    <div className={styles.container}>
      <div className={styles.positive}>
        <div className={styles.countStatement}>
          <span className={styles.count}>{positiveCount ?? 0}</span>
          <p className={styles.statement}>Positive Feedbacks</p>
        </div>
        <FaHeart />
      </div>

      <div className={styles.negative}>
        <div className={styles.countStatement}>
          <span className={styles.count}>{negativeCount ?? 0}</span>
          <p className={styles.statement}>Negative Feedbacks</p>
        </div>
        <FaHeartBroken />
      </div>
    </div>
  );
};

export default FeedbackCount;
