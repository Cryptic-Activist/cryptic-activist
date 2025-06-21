'use client';

import { BRAVE_WALLET, METAMASK } from '@/constants';
import { Brave, EthereumLogo, MetaMask, PolygonLogo } from '@/assets';
import { ProviderImageProps, ValueContainerProps } from './types';
import React, { FC, useEffect, useState } from 'react';
import { useBlockchain, useNavigationBar, useUser } from '@/hooks';

import { DynamicIcon } from '@/components';
import { FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';
import { copyToClipboard } from '@/utils';
import styles from './index.module.scss';

const ProviderImage: FC<ProviderImageProps> = ({ provider }) => {
  const getProviderImage = () => {
    switch (provider) {
      case BRAVE_WALLET: {
        return Brave.src;
      }
      case METAMASK: {
        return MetaMask.src;
      }
      default: {
        return '';
      }
    }
  };

  return (
    <span
      className={styles.provider}
      style={{ backgroundImage: `url(${getProviderImage()})` }}
    />
  );
};

const ValueContainer: FC<ValueContainerProps> = ({ label, value }) => {
  return (
    <div className={styles.valueContainer}>
      <label className={styles.label}>{label}</label>
      <span className={styles.value}>{value}</span>
    </div>
  );
};

const Wallet = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isChainsOpened, setIsChainsOpened] = useState(false);

  const { toggleDrawer } = useNavigationBar();
  const {
    blockchain,
    onDisconnectWallet,
    handleSwitchChain,
    supportedChainsQuery,
  } = useBlockchain();
  const { user } = useUser();

  const isEthereum = blockchain?.chain?.name === 'Ethereum';
  const isPolygon =
    blockchain?.chain?.name === 'Polygon' ||
    blockchain?.chain?.name === 'Chain-80002';
  const isLocalhost = blockchain.chain?.name === 'Localhost';

  console.log({ blockchainName: blockchain.chain.name });

  const walletStyle = isOpened ? styles.closed : styles.opened;

  const closeWallet = () => {
    setIsOpened((prev) => !prev);
    setTimeout(() => {
      toggleDrawer('wallet');
    }, 600);
  };

  const onCopyAddress = () => {
    copyToClipboard(blockchain.account?.address);
    setIsCopied((prev) => !prev);
  };

  const toggleSwitchChain = () => {
    setIsChainsOpened((prev) => !prev);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  }, [isCopied]);

  const ethereumBgColor =
    isEthereum || isLocalhost ? styles.ethereumBgColor : '';
  const polygonBgColor = isPolygon ? styles.polygonBgColor : '';
  const chainsStyle = isChainsOpened ? styles.switchChainListOpened : '';

  return (
    <>
      <div className={styles.background} onClick={closeWallet} />
      <aside className={`${styles.container} ${walletStyle}`}>
        <button className={styles.closeButton} onClick={closeWallet}>
          <FaChevronRight size={18} />
        </button>
        <div className={styles.content}>
          <div className={styles.header}>
            <button
              className={styles.accountInfo}
              type="button"
              onClick={onCopyAddress}
            >
              <div className={styles.profileColorProvider}>
                <div
                  className={`${styles.profileColor} ${ethereumBgColor} ${polygonBgColor}`}
                  style={{
                    backgroundColor: !blockchain?.chain?.name
                      ? user.profileColor
                      : '',
                  }}
                >
                  {isEthereum || isLocalhost ? (
                    <Image
                      src={EthereumLogo.src ?? null}
                      alt="Ethereum Logo"
                      width={30}
                      height={30}
                    />
                  ) : (
                    ''
                  )}
                  {isPolygon ? (
                    <Image
                      src={PolygonLogo.src ?? null}
                      alt="Polygon Logo"
                      width={30}
                      height={30}
                    />
                  ) : (
                    ''
                  )}
                </div>
                <ProviderImage provider={blockchain.wallet} />
              </div>

              <p className={styles.address}>
                {isCopied ? 'Address copied' : blockchain.account?.address}
              </p>
            </button>
            <div className={styles.switchPowerContainer}>
              <button
                className={styles.disconnect}
                onClick={onDisconnectWallet}
              >
                <DynamicIcon iconName="FaPowerOff" size={24} color="#ffcd2b" />
              </button>
            </div>
          </div>
          <section>
            <div className={styles.accordion}>
              <button
                className={`${styles.menuButton} ${styles.userButton}`}
                onClick={toggleSwitchChain}
              >
                Switch Chain
              </button>
              <ul className={`${styles.switchChainList} ${chainsStyle}`}>
                {supportedChainsQuery?.data?.map(
                  (chain: any, index: number) => (
                    <li className={styles.subMenuItem} key={index}>
                      <button
                        onClick={() => handleSwitchChain(chain.value)}
                        className={styles.chainButton}
                      >
                        {chain.label}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
          </section>
          <section className={styles.row}>
            <div className={styles.column}>
              <ValueContainer label={'Chain ID'} value={blockchain.chain?.id} />
              <ValueContainer
                label={'Blockchain'}
                value={blockchain.chain?.name}
              />
            </div>
            <ValueContainer
              label={'Balance'}
              value={
                blockchain.balance?.formatted
                  ? `${parseFloat(blockchain.balance?.formatted)} ${
                      blockchain?.balance.symbol
                    }`
                  : ''
              }
            />
          </section>
        </div>
      </aside>
    </>
  );
};

export default Wallet;
