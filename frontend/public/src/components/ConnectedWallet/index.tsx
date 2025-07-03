'use client';

import { useBlockchain, useNavigationBar, useUser } from '@/hooks';

import Image from 'next/image';
import React from 'react';
// import { getChainNameById } from '@/utils/blockchain';
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
  // const chainName =
  //   blockchain.chain?.name || getChainNameById(blockchain.chain?.id);

  // const isLocalhost = chainName === 'Localhost';

  const openWallet = () => {
    if (!wallet) {
      toggleDrawer('wallet');
    }
  };

  return (
    <button className={styles.container} onClick={openWallet}>
      <div
        className={styles.profileColor}
        style={{
          backgroundColor: !blockchain?.chain?.name ? user.profileColor : '',
        }}
      >
        {blockchain.chain?.logoUrl && (
          <Image
            src={blockchain.chain?.logoUrl}
            alt="Ethereum Logo"
            width={28}
            height={28}
          />
        )}
        {/* {isEthereum || isLocalhost ? (
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
        )} */}
      </div>
      <p className={styles.address}>{blockchain.account?.address}</p>
    </button>
  );
};

export default ConnectedWallet;
