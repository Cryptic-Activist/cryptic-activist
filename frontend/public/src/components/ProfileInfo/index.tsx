'use client';

import { FC } from 'react';

import { formatFullDate } from '@/utils';

import styles from './index.module.scss';
import type { ProfileInfoProps } from './types';

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
          Joined on: <span>{formatFullDate(user?.createdAt)}</span>
        </li>
      </ul>
    </div>
  );
};

export default ProfileInfo;
