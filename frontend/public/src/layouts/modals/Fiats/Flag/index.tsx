import React, { FC } from 'react';

import { FlagProps } from './types';
import Image from 'next/image';

const Flag: FC<FlagProps> = ({ country, flag }) => {
  return (
    <Image src={flag ?? null} alt={`${country} flag`} width={35} height={35} />
  );
};

export default Flag;
