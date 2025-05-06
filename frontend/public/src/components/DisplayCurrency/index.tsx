import React, { FC } from 'react';

import { DisplayCurrencyProps } from './types';
import Image from 'next/image';
import styles from './index.module.scss';

const DisplayCurrency: FC<DisplayCurrencyProps> = ({ image, name }) => {
  return (
    <div className={styles.container}>
      <Image src={image ?? null} alt={`${name} icon`} width={24} height={24} />
      <span>{name}</span>
    </div>
  );
};

export default DisplayCurrency;
