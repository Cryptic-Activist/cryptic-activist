'use client';

import {
  CurrentOffers,
  FeedbackCount,
  ProfileNameUsername,
  Status,
} from '@/components';
import { useDynamicTitle, useUser } from '@/hooks';

import { ProfileImageInfo } from '@/layouts';
import styles from './index.module.scss';

export default function Account() {
  const { user } = useUser();
  const {} = useDynamicTitle('Account | Cryptic Activist');

  return (
    <div className={styles.container}>
      <ProfileImageInfo user={user} />
      <div className={styles.mainInfo}>
        <ProfileNameUsername names={user?.names} username={user?.username} />
        <Status status="offline" />
        <FeedbackCount feedbacksCount={user._count?.feedbackCount} />
        {user.id && <CurrentOffers vendorId={user.id} />}
        {/* <Feedbacks /> */}
      </div>
    </div>
  );
}
