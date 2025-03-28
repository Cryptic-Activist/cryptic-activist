import React, { FC } from 'react';

import { FaCircle } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';
import Link from 'next/link';
import ProfileImage from '../ProfileImage';
import Tooltip from '../Tooltip';
import { VendorInfoProps } from './types';
import styles from './index.module.scss';
import { timeSince } from '@/utils';

const VendorInfo: FC<VendorInfoProps> = ({ vendor, size }) => {
  return (
    <div className={styles.vendor}>
      <ProfileImage
        size={size}
        user={{
          names: {
            firstName: vendor.firstName,
            lastName: vendor.lastName,
          },
          profileColor: vendor.profileColor,
        }}
      />
      <div className={styles.namesCounters}>
        <Link
          className={styles.namesUsernameLink}
          href={`/vendor/${vendor.id}`}
        >
          <div className={styles.namesCheck}>
            <span
              className={styles.names}
            >{`${vendor.firstName} ${vendor.lastName}`}</span>
            <Tooltip position="bottom" spacing={20}>
              {vendor.kyc !== null ? (
                <FaCircleCheck size={15} className={styles.check} />
              ) : (
                <></>
              )}
              <div className={styles.checkTooltip}>
                This vendor has been verified through KYC
              </div>
            </Tooltip>
          </div>
          <span className={styles.vendorUsername}>{vendor.username}</span>
        </Link>
        <div className={styles.status}>
          <FaCircle size={10} />
          <span>{timeSince(vendor.lastLoginAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default VendorInfo;
