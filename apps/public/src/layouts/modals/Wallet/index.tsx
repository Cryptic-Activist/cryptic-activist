import React, { FC, Fragment } from 'react';

import { BRAVE_WALLET } from '@/constants';
import { Button } from '@/components';
import { ProviderProps } from './types';
import { Template } from '@/layouts/modals';
import { checkInstalledWallet } from '@/services/blockchain';
import styles from './index.module.scss';
import useBlockchain from '@/hooks/useBlockchain';
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
  const { connectors, onConnectWallet } = useBlockchain();

  return (
    <Template heading="Select Wallet" width="24rem">
      <ul className={styles.walletList}>
        {connectors.map((connector) => (
          <Fragment key={connector.uid}>
            {connector.name !== BRAVE_WALLET && (
              <Provider
                connector={connector}
                onConnectWallet={onConnectWallet}
              />
            )}
          </Fragment>
        ))}
      </ul>
    </Template>
  );
};

export default Wallet;
