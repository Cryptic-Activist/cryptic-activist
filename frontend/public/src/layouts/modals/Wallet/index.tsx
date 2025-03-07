import React, { FC } from 'react';

import { Button } from '@/components';
import Image from 'next/image';
import { ProviderProps } from './types';
import { Template } from '@/layouts/modals';
import { WalletName } from '@/hooks/useBlockchain/types';
import { checkInstalledWallet } from '@/services/blockchain';
import styles from './index.module.scss';
import { toCapitalize } from '@/utils';
import useBlockchain from '@/hooks/useBlockchain';
import { useConnect } from 'wagmi';
import { useQuery } from '@tanstack/react-query';

const Provider: FC<ProviderProps> = ({ connector, onConnectWallet }) => {
  const { data: isWalletAvailable } = useQuery({
    queryKey: ['provider-' + connector.name],
    queryFn: () => checkInstalledWallet(connector),
  });

  return (
    <Button
      key={connector.uid}
      onClick={() => onConnectWallet(connector)}
      size={18}
      padding="0.8rem 1rem"
      type="button"
      align="center"
      fullWidth
      theme="secondary"
      isDisabled={!isWalletAvailable}
    >
      <div className={styles.buttonContainer}>
        <p className={styles.label}>{connector.name}</p>
        {!isWalletAvailable && (
          <span className={styles.tag}>Not Installed</span>
        )}
      </div>
    </Button>
  );
};

const Wallet = () => {
  const { connectors, connect, onConnectWallet } = useBlockchain();

  return (
    <Template heading="Select Wallet" width="24rem">
      <ul className={styles.walletList}>
        {connectors.map((connector) => (
          <Provider
            key={connector.uid}
            connector={connector}
            onConnectWallet={onConnectWallet}
          />
        ))}
      </ul>
    </Template>
  );
};

export default Wallet;
