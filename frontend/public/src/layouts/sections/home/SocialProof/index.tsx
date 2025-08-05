'use client';

import { DynamicIcon } from '@/components';
import Link from 'next/link';
import { getBestVendors } from '@/services/vendors';
import { getInitials } from '@/utils';
import styles from './index.module.scss';
import { useQuery } from '@tanstack/react-query';

const SocialProof = () => {
  const bestVendors = useQuery({
    queryKey: ['bestVendors'],
    queryFn: getBestVendors,
  });

  console.log({ bestVendorsData: bestVendors.data });

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Best Vendors</h2>
      <p className={styles.subheading}>
        Most trustworthy and active vendors currently trading.
      </p>

      <div className={styles.vendors}>
        {bestVendors.data?.map((vendor: any, index: number) => (
          <div className={styles.vendorCard} key={index}>
            <Link href={`/vendor/${vendor.id}`} className={styles.link}>
              <div
                className={styles.initials}
                style={{
                  backgroundColor: vendor.profileColor,
                }}
              >
                {getInitials(vendor.firstName, vendor.lastName)}
              </div>
              <div className={styles.namesUsernameCounters}>
                <div className={styles.namesUsername}>
                  <strong>{`${vendor.firstName} ${vendor.lastName}`}</strong>
                  <span>{vendor.username}</span>
                </div>

                <div className={styles.counters}>
                  <div className={styles.counter}>
                    <DynamicIcon iconName="FaArrowRightArrowLeft" size={14} />
                    <span>{vendor._count.tradeVendor}</span>
                  </div>
                  <div className={styles.counter}>
                    <DynamicIcon iconName="FaHeart" size={14} />
                    <span>{vendor._count.feedbackTrader}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialProof;
