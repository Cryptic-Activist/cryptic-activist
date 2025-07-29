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
import { validateWithAuthToken } from '@/services/user';
import { withAuth } from '@/hoc/withAuth';

function Account() {
  const { user } = useUser();
  const {} = useDynamicTitle('Account | Cryptic Activist');

  const isKYCVerified =
    user?.kyc && user?.kyc?.length > 0 && user?.kyc[0]?.status === 'VERIFIED';

  return (
    <div className={styles.container}>
      <ProfileImageInfo user={user} />
      <div className={styles.mainInfo}>
        <ProfileNameUsername
          names={user?.names}
          username={user?.username}
          isUser={true}
          hasKYC={isKYCVerified}
        />
        <Status status="offline" />
        <FeedbackCount feedbacksCount={user._count?.feedbacks} />
        {user.id && <CurrentOffers vendorId={user.id} />}
        {user.id && <Feedbacks vendorId={user.id} />}
      </div>
    </div>
  );
}

export default withAuth(Account);
