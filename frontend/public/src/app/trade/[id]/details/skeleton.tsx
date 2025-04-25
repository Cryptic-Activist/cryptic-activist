import React from 'react';
import styles from './skeleton.module.scss';

const TradeDetailsPageSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div>
          <div className={`${styles.skeleton} ${styles.skeletonBadge}`}></div>
        </div>

        <div className={styles.tradeInfo}>
          <div>
            <div className={styles.infoGroup}>
              <div
                className={`${styles.skeleton} ${styles.skeletonLabel}`}
              ></div>
              <div
                className={`${styles.skeleton} ${styles.skeletonValue}`}
              ></div>
            </div>

            <div className={styles.infoGroup}>
              <div
                className={`${styles.skeleton} ${styles.skeletonLabel}`}
              ></div>
              <div
                className={`${styles.skeleton} ${styles.skeletonValueLarge}`}
              ></div>
            </div>

            <div className={styles.infoGroup}>
              <div
                className={`${styles.skeleton} ${styles.skeletonLabel}`}
              ></div>
              <div
                className={`${styles.skeleton} ${styles.skeletonValueLarge}`}
              ></div>
            </div>

            <div className={styles.infoGroup}>
              <div
                className={`${styles.skeleton} ${styles.skeletonLabel}`}
              ></div>
              <div
                className={`${styles.skeleton} ${styles.skeletonValue}`}
              ></div>
            </div>
          </div>

          <div>
            <div className={styles.infoGroup}>
              <div
                className={`${styles.skeleton} ${styles.skeletonLabel}`}
              ></div>
              <div
                className={`${styles.skeleton} ${styles.skeletonValue}`}
              ></div>
            </div>

            <div className={styles.infoGroup}>
              <div
                className={`${styles.skeleton} ${styles.skeletonLabel}`}
              ></div>
              <div
                className={`${styles.skeleton} ${styles.skeletonValue}`}
              ></div>
            </div>

            <div className={styles.infoGroup}>
              <div
                className={`${styles.skeleton} ${styles.skeletonLabel}`}
              ></div>
              <div
                className={`${styles.skeleton} ${styles.skeletonValue}`}
              ></div>
            </div>

            <div className={styles.infoGroup}>
              <div
                className={`${styles.skeleton} ${styles.skeletonLabel}`}
              ></div>
              <div
                className={`${styles.skeleton} ${styles.skeletonValue}`}
              ></div>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        {/* User info skeleton - Vendor */}
        <div className={styles.userInfo}>
          <div className={`${styles.skeleton} ${styles.skeletonAvatar}`}></div>
          <div className={styles.userDetails}>
            <div
              className={`${styles.skeleton} ${styles.skeletonUsername}`}
            ></div>
            <div className={styles.userStats}>
              <div
                className={`${styles.skeleton} ${styles.skeletonStat}`}
              ></div>
              <div
                className={`${styles.skeleton} ${styles.skeletonStat}`}
              ></div>
            </div>
          </div>
        </div>

        {/* User info skeleton - Trader */}
        <div className={styles.userInfo}>
          <div className={`${styles.skeleton} ${styles.skeletonAvatar}`}></div>
          <div className={styles.userDetails}>
            <div
              className={`${styles.skeleton} ${styles.skeletonUsername}`}
            ></div>
            <div className={styles.userStats}>
              <div
                className={`${styles.skeleton} ${styles.skeletonStat}`}
              ></div>
              <div
                className={`${styles.skeleton} ${styles.skeletonStat}`}
              ></div>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div
          className={`${styles.skeleton} ${styles.skeletonSectionTitle}`}
        ></div>
        <div className={styles.paymentDetails}>
          <div className={styles.infoGroup}>
            <div className={`${styles.skeleton} ${styles.skeletonLabel}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonValue}`}></div>
          </div>

          <div className={styles.infoGroup}>
            <div className={`${styles.skeleton} ${styles.skeletonLabel}`}></div>
            <div className={styles.paymentInstructions}>
              <div
                className={`${styles.skeleton} ${styles.skeletonLine}`}
              ></div>
              <div
                className={`${styles.skeleton} ${styles.skeletonLine}`}
              ></div>
              <div
                className={`${styles.skeleton} ${styles.skeletonLine}`}
              ></div>
              <div
                className={`${styles.skeleton} ${styles.skeletonLine}`}
              ></div>
            </div>
          </div>

          <div className={styles.infoGroup}>
            <div className={`${styles.skeleton} ${styles.skeletonLabel}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonLink}`}></div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div
          className={`${styles.skeleton} ${styles.skeletonSectionTitle}`}
        ></div>
        <div className={styles.tradeProgress}>
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <div className={styles.milestone} key={index}>
              <div
                className={`${styles.skeleton} ${styles.skeletonMilestoneIcon}`}
              ></div>
              <div
                className={`${styles.skeleton} ${styles.skeletonMilestoneText}`}
              ></div>
            </div>
          ))}
        </div>

        <div className={styles.chatSection}>
          <div
            className={`${styles.skeleton} ${styles.skeletonSectionTitle}`}
          ></div>
          <div className={`${styles.skeleton} ${styles.skeletonButton}`}></div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.actionButtons}>
          <div className={`${styles.skeleton} ${styles.skeletonButton}`}></div>
          <div className={`${styles.skeleton} ${styles.skeletonButton}`}></div>
          <div className={`${styles.skeleton} ${styles.skeletonButton}`}></div>
        </div>
      </div>
    </div>
  );
};

export default TradeDetailsPageSkeleton;
