import React, { FC } from 'react';

import { FlagProps } from './types';
import Image from 'next/image';

const Flag: FC<FlagProps> = ({ country, flag }) => {
  return <Image src={flag} alt={`${country} flag`} width={40} height={40} />;
};

export default Flag;
