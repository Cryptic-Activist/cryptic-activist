'use client';

import React, { FC, useState } from 'react';

import { FaInfo } from 'react-icons/fa6';
import { InfoProps } from './types';
import Tooltip from '../Tooltip';
import styles from './index.module.scss';

const Info: FC<InfoProps> = ({ message }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMessage = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Tooltip position="left" spacing={165}>
      <div
        className={styles.icon}
        onMouseEnter={toggleMessage}
        onMouseLeave={toggleMessage}
      >
        <FaInfo size={12} />
      </div>
      {isOpen ? <p className={styles.message}>{message}</p> : <></>}
    </Tooltip>
  );
};

export default Info;
