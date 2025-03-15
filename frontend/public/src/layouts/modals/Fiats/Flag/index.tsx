import React, { FC, useCallback } from 'react';

import { FlagProps } from './types';
import Image from 'next/image';
import countryFlags from './countryFlags';
import styles from './index.module.scss';

const Flag: FC<FlagProps> = ({ country }) => {
  const getFlagIcon = useCallback(() => {
    // console.log({ country, countryFlags: countryFlags[country] });
    return countryFlags[country];
  }, []);

  return (
    <Image src={getFlagIcon()} alt={`${country} flag`} width={40} height={40} />
  );
};

export default Flag;
