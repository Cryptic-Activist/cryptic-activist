'use client';

import { FC } from 'react';

import { getInitials } from '@/utils';

import styles from './index.module.scss';
import type { ProfileImageProps } from './types';

const ProfileImage: FC<ProfileImageProps> = ({ size, user }) => {
  const s =
    size === 'xSmall'
      ? {
          height: '3.5rem',
          width: '3.5rem',
          fontSize: '1.8rem',
        }
      : size === 'small'
      ? {
          height: '5rem',
          width: '5rem',
          fontSize: '2.5rem',
        }
      : size === 'medium'
      ? {
          height: '10rem',
          width: '10rem',
          fontSize: '4rem',
        }
      : {
          height: '15rem',
          width: '15rem',
          fontSize: '5rem',
        };

  return (
    <div
      className={styles.container}
      style={{
        ...(size && {
          height: s.height,
          width: s.width,
          fontSize: s.fontSize,
          color: user?.profileColor,
        }),
      }}
    >
      {getInitials(user?.names?.firstName ?? '', user?.names?.lastName ?? '')}
    </div>
  );
};

export default ProfileImage;
