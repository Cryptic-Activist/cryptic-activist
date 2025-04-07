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
          Languages:{' '}
          {user?.languages?.map((language, index) => (
            <span key={index}>{language.name}</span>
          ))}
        </li>
        <li>
          Number of trades: <span>{user?._count?.trades}</span>
        </li>
        <li>
          Trusted by <span>{user?._count?.trades} people</span>
        </li>
        <li>
          Blocked by <span>{user?._count?.blockers} people</span>
        </li>
        <li>
          Has blocked <span>{user?._count?.blocked} people</span>
        </li>
        <li>
          Joined on: <span>{formatFullDate(user?.createdAt)}</span>
        </li>
      </ul>
    </div>
  );
};

export default ProfileInfo;
