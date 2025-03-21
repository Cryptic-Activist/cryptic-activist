import React, { FC } from 'react';

import { TierProps } from './types';
import styles from './index.module.scss';

const Tier: FC<TierProps> = ({ tier }) => {
  const getTierColor = () => {
    switch (tier?.name) {
      case 'Bronze': {
        return '#cd7f32';
      }
      case 'Silver': {
        return '#c0c0c0';
      }
      case 'Gold': {
        return '#ffd700';
      }
      case 'Platinum': {
        return '#e5e4e2';
      }
      case 'Diamond': {
        return '#b9f2ff';
      }
      default: {
        return '';
      }
    }
  };

  return (
    <div className={styles.tier}>
      <div className={styles.iconNameLevelContainer}>
        <div
          className={styles.icon}
          style={{ backgroundColor: getTierColor() }}
        />
        <div className={styles.nameLevelContainer}>
          <p className={styles.name}>{tier?.name}</p>
          <p className={styles.level}>Level {tier?.level}</p>
        </div>
      </div>
    </div>
  );
};

export default Tier;
