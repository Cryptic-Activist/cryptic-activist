'use client';

import React from 'react';

import { useApp, useBlockchain, useNavigationBar, useUser } from '@/hooks';

import styles from './index.module.scss';

const ConnectedWallet = () => {
  const { blockchain } = useBlockchain();
  const { user } = useUser();
  const {
    toggleDrawer,
    navigationBar: {
      drawers: { wallet },
    },
  } = useNavigationBar();

  const openWallet = () => {
    if (!wallet) {
      toggleDrawer('wallet');
    }
  };

  return (
    <button className={styles.container} onClick={openWallet}>
      <span
        className={styles.profileColor}
        style={{ backgroundColor: user.profileColor }}
      />
      <p className={styles.address}>{blockchain.account?.address}</p>
    </button>
  );
};

export default ConnectedWallet;
