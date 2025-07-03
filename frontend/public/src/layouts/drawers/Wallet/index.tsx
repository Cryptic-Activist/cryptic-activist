'use client';

import { BRAVE_WALLET, METAMASK } from '@/constants';
import { Brave, MetaMask } from '@/assets';
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
  const [isTokensOpened, setIsTokensOpened] = useState(false);

  const { toggleDrawer } = useNavigationBar();
  const {
    blockchain,
    onDisconnectWallet,
    handleSwitchChain,
    supportedChainsQuery,
    tokens,
  } = useBlockchain();
  const { user } = useUser();

  // const isLocalhost = blockchain.chain?.name === 'Localhost';

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

  const toggleTokens = () => {
    setIsTokensOpened((prev) => !prev);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  }, [isCopied]);

  const chainsStyle = isChainsOpened ? styles.switchChainListOpened : '';
  const tokensStyle = isTokensOpened ? styles.tokensListOpened : '';

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
                  className={styles.profileColor}
                  style={{
                    backgroundColor: !blockchain?.chain?.name
                      ? user.profileColor
                      : '#fff',
                  }}
                >
                  {blockchain.chain?.logoUrl && (
                    <Image
                      src={blockchain.chain?.logoUrl}
                      alt="Polygon Logo"
                      width={40}
                      height={40}
                    />
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
                        onClick={() => handleSwitchChain(chain.chainId)}
                        className={styles.chainButton}
                      >
                        {chain.name}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
          </section>
          <section>
            <div className={styles.accordion}>
              <button
                className={`${styles.menuButton} ${styles.userButton}`}
                onClick={toggleTokens}
              >
                Tokens
              </button>
              <ul className={`${styles.tokensList} ${tokensStyle}`}>
                {tokens && tokens?.length > 0 ? (
                  tokens?.map((token: any, index: number) => (
                    <li className={styles.subMenuItem} key={index}>
                      <button
                        // onClick={() => handleSwitchChain(token.value)}
                        className={styles.tokenButton}
                      >
                        <Image
                          src={token.cryptocurrency?.image}
                          width={30}
                          height={30}
                          alt={token.cryptocurrency?.name}
                        />
                        <span>{token.cryptocurrency?.name}</span>
                      </button>
                    </li>
                  ))
                ) : (
                  <li className={styles.subMenuItem}>
                    <button className={styles.tokenButton}>
                      No Tokens Available
                    </button>
                  </li>
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
