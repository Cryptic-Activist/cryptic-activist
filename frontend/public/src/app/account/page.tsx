'use client';
import { ProfileNameUsername, Status } from '@/components';
import ProtectedRoute from '@/hoc/ProtectedRoute';
import { useUser } from '@/hooks';
import { ProfileImageInfo } from '@/layouts';

import FeedbackCount from '@/components/FeedbackCount';
import styles from './index.module.scss';

const Account = () => {
  const { user } = useUser();

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <ProfileImageInfo user={user} />
        <div className={styles.mainInfo}>
          <ProfileNameUsername names={user?.names} username={user?.username} />
          <Status status="offline" />
          <FeedbackCount positiveCount={13} negativeCount={2} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Account;
