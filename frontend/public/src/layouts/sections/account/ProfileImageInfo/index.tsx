import { ProfileImage, ProfileInfo } from '@/components';

import { FC } from 'react';
import { ProfileSection } from './types';
import styles from './index.module.scss';

const ProfileImageInfo: FC<ProfileSection> = ({ user }) => {
  return (
    <div className={styles.container}>
      <ProfileImage height={18} width={18} size="large" user={user} />
      <ProfileInfo user={user} />
    </div>
  );
};

export default ProfileImageInfo;
