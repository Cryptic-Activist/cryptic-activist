'use client';

import { EthereumLogo, PolygonLogo } from '@/assets';
import { useBlockchain, useNavigationBar, useUser } from '@/hooks';

import Image from 'next/image';
import React from 'react';
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
  const isEthereum = blockchain?.chain?.name === 'Ethereum';
  const isPolygon = blockchain?.chain?.name === 'Polygon';
  const isLocalhost = blockchain.chain?.name === 'Localhost';

  const openWallet = () => {
    if (!wallet) {
      toggleDrawer('wallet');
    }
  };

  const ethereumBgColor =
    isEthereum || isLocalhost ? styles.ethereumBgColor : '';
  const polygonBgColor = isPolygon ? styles.polygonBgColor : '';

  return (
    <button className={styles.container} onClick={openWallet}>
      <div
        className={`${styles.profileColor} ${ethereumBgColor} ${polygonBgColor}`}
        style={{
          backgroundColor: !blockchain?.chain?.name ? user.profileColor : '',
        }}
      >
        {isEthereum || isLocalhost ? (
          <Image
            src={EthereumLogo.src ?? null}
            alt="Ethereum Logo"
            width={18}
            height={18}
          />
        ) : (
          ''
        )}
        {isPolygon ? (
          <Image
            src={PolygonLogo.src ?? null}
            alt="Polygon Logo"
            width={18}
            height={18}
          />
        ) : (
          ''
        )}
      </div>
      <p className={styles.address}>{blockchain.account?.address}</p>
    </button>
  );
};

export default ConnectedWallet;
