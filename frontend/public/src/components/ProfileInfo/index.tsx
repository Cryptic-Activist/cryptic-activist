'use client';

import { FC } from 'react';
import type { ProfileInfoProps } from './types';
import { formatFullDate } from '@/utils';
import styles from './index.module.scss';

const ProfileInfo: FC<ProfileInfoProps> = ({ user }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Profile Information</div>
      <ul className={styles.list}>
        <li>
          <span className={styles.label}>Languages:</span>{' '}
          {user?.languages?.map((language, index) => {
            const isLast = index === (user.languages?.length ?? 0) - 1;
            return (
              <span key={index} className={styles.value}>
                {language.name}
                {!isLast ? ', ' : ''}
              </span>
            );
          })}
        </li>
        <li>
          <span className={styles.label}>Number of trades:</span>{' '}
          <span className={styles.value}>{user?._count?.trades}</span>
        </li>
        <li>
          <span className={styles.label}>Trusted by</span>{' '}
          <span className={styles.value}>{user?._count?.trusters} people</span>
        </li>
        <li>
          <span className={styles.label}>Blocked by</span>{' '}
          <span className={styles.value}>{user?._count?.blockers} people</span>
        </li>
        <li>
          <span className={styles.label}>Has blocked</span>{' '}
          <span className={styles.value}>{user?._count?.blocked} people</span>
        </li>
        <li>
          <span className={styles.label}>Joined on:</span>{' '}
          <span className={styles.value}>
            {formatFullDate(user?.createdAt)}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default ProfileInfo;
