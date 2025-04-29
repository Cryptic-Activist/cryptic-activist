import React, { FC } from 'react';

import { FeedbacksProps } from './types';
import { getFeedbacks } from '@/services/feedbacks';
import { getInitials } from '@/utils';
import styles from './index.module.scss';
import { useQuery } from '@tanstack/react-query';

const Feedbacks: FC<FeedbacksProps> = ({ vendorId }) => {
  const { data, isPending } = useQuery({
    queryKey: ['feedbacks'],
    queryFn: async () => {
      const response = await getFeedbacks(vendorId);
      return response;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
    retry: 3,
    enabled: !!vendorId,
  });

  const getFeedbackTypeClass = (type: string) => {
    switch (type) {
      case 'POSITIVE':
        return styles.positive;
      case 'NEUTRAL':
        return styles.neutral;
      case 'NEGATIVE':
        return styles.negative;
      default:
        return '';
    }
  };

  return (
    <div className={styles.container}>
      <h2>Feedbacks</h2>
      {isPending && <p>Loading...</p>}
      {data?.length === 0 && 'No feedbacks yet'}
      {data?.length > 0 && (
        <div className={styles.list}>
          {data?.map((feedback: any) => (
            <div key={feedback.id} className={styles.feedbackItem}>
              <div
                className={styles.initials}
                style={{ backgroundColor: feedback.trader.profileColor }}
              >
                {getInitials(
                  feedback.trader.firstName,
                  feedback.trader.lastName
                )}
              </div>
              <div className={styles.traderInfo}>
                <div className={styles.namesUsernameType}>
                  <div className={styles.traderNamesUsername}>
                    <div className={styles.traderName}>
                      {feedback.trader.firstName} {feedback.trader.lastName}
                    </div>
                    <div className={styles.traderUsername}>
                      {feedback.trader.username}
                    </div>
                  </div>
                  <div
                    className={`${styles.feedbackType} ${getFeedbackTypeClass(
                      feedback.type
                    )}`}
                  >
                    {feedback.type}
                  </div>
                </div>
                <div className={styles.feedbackContent}>{feedback.message}</div>
                <div className={styles.time}>{feedback.time}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feedbacks;
