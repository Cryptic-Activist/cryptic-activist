'use client';

import { ProfileNameUsername, Status } from '@/components';
import { useDynamicTitle, useUser } from '@/hooks';

import FeedbackCount from '@/components/FeedbackCount';
import { ProfileImageInfo } from '@/layouts';
import styles from './index.module.scss';
import withAuth from '@/hoc/withAuth';

const Account = () => {
  const { user } = useUser();
  const {} = useDynamicTitle('Account | Cryptic Activist');

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
