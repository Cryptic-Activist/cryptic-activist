import {
  CurrentOffers,
  FeedbackCount,
  Feedbacks,
  ProfileNameUsername,
  Status,
} from '@/components';
import React, { FC } from 'react';

import { ProfileImageInfo } from '@/layouts';
import { VendorPageProps } from './types';
import styles from './index.module.scss';
import { useUser } from '@/hooks';

const Vendor: FC<VendorPageProps> = ({ vendor }) => {
  const { user } = useUser();

  const isSameUser = vendor.id === user.id;

  return (
    <div className={styles.container}>
      <ProfileImageInfo user={vendor} />
      <div className={styles.mainInfo}>
        <ProfileNameUsername
          names={vendor?.names}
          username={vendor?.username}
          isUser={isSameUser}
        />
        <Status status="offline" />
        <FeedbackCount feedbacksCount={user._count?.feedbacks} />
        {vendor.id && <CurrentOffers vendorId={vendor.id} />}
        {vendor.id && <Feedbacks vendorId={vendor.id} />}
      </div>
    </div>
  );
};

export default Vendor;
