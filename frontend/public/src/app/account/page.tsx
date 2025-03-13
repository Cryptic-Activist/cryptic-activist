'use client';

import { ProfileNameUsername, Status } from '@/components';

import FeedbackCount from '@/components/FeedbackCount';
import { ProfileImageInfo } from '@/layouts';
import styles from './index.module.scss';
import { useUser } from '@/hooks';
import withAuth from '@/hoc/withAuth';

const Account = () => {
  const { user } = useUser();

  return (
    <div className={styles.container}>
      <ProfileImageInfo user={user} />
      <div className={styles.mainInfo}>
        <ProfileNameUsername names={user?.names} username={user?.username} />
        <Status status="offline" />
        <FeedbackCount positiveCount={13} negativeCount={2} />
      </div>
    </div>
  );
};

export default Account;
