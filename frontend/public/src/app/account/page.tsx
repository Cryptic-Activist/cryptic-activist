'use client';

import {
  CurrentOffers,
  FeedbackCount,
  Feedbacks,
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
        <ProfileNameUsername
          names={user?.names}
          username={user?.username}
          isUser={true}
        />
        <Status status="offline" />
        <FeedbackCount feedbacksCount={user._count?.feedbacks} />
        {user.id && <CurrentOffers vendorId={user.id} />}
        {user.id && <Feedbacks vendorId={user.id} />}
      </div>
    </div>
  );
}
