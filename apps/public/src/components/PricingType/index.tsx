import React, { FC } from 'react';

import { PricingTypeProps } from './types';
import Radio from '@/components/Radio';
import styles from './index.module.scss';
import { useCreateOffer } from '@/hooks';

const PricingType: FC<PricingTypeProps> = ({ onChange }) => {
  const { createOffer } = useCreateOffer();

  const handleOnChange = (item: any) => {
    onChange(item);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>
        Choose the {createOffer?.cryptocurrency?.name} rate you want to use
      </h3>
      <Radio
        items={[
          {
            label: 'Market Price',
            value: 'market',
            description: `Your offer's selling price will change according to the market price of ${createOffer?.cryptocurrency?.name}`,
          },
          {
            label: 'Fixed Price',
            value: 'fixed',
            description: `Your offer's selling price is locked when the offer is created, and won’t
						change with market price of ${createOffer?.cryptocurrency?.name}`,
          },
        ]}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default PricingType;
