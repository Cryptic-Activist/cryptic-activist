'use client';

import React, { FC, useState } from 'react';
import { useBlockchain, useNavigationBar, useUser } from '@/hooks';

import { FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';
import styles from './index.module.scss';

const User: FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isUserOpened, setIsUserOpened] = useState(false);

  const {
    toggleDrawer,
    toggleModal,
    resetNavigationBar,
    navigationBar: {
      drawers: { wallet },
    },
  } = useNavigationBar();
  const { onDisconnectWallet, isWalletConnected } = useBlockchain();
  const { user, logout, isLoggedIn } = useUser();

  const walletStyle = isOpened ? styles.closed : styles.opened;
  const userStyle = isUserOpened ? styles.userContentListOpened : '';

  const closeWallet = () => {
    setIsOpened((prev) => !prev);
    setTimeout(() => {
      toggleDrawer('user');
    }, 600);
  };

  const handleToggleUser = () => {
    setIsUserOpened((prev) => !prev);
  };

  const handleLogout = () => {
    resetNavigationBar();
    onDisconnectWallet();
    logout();
  };

  const handleToggleLogin = () => {
    resetNavigationBar();
    toggleModal('login');
  };

  const handleToggleBlockchain = () => {
    toggleDrawer('user');
    toggleModal('blockchain');
  };

  const openWallet = () => {
    if (!wallet) {
      toggleDrawer('user');
      toggleDrawer('wallet');
    }
  };

  const navigate = () => {
    toggleDrawer('user');
  };

  return (
    <>
      <div className={styles.background} />
      <aside className={`${styles.container} ${walletStyle}`}>
        <button className={styles.closeButton} onClick={closeWallet}>
          <FaChevronRight size={18} />
        </button>
        <div className={styles.content}>
          {!isLoggedIn() && (
            <button
              className={`${styles.menuButton} ${styles.userButton}`}
              onClick={handleToggleLogin}
            >
              Login
            </button>
          )}
          {isLoggedIn() && (
            <>
              <div className={styles.accordion}>
                <button
                  className={`${styles.menuButton} ${styles.userButton}`}
                  onClick={handleToggleUser}
                >
                  <span
                    className={styles.userButtonNames}
                  >{`${user.names?.firstName} ${user.names?.lastName}`}</span>
                  <span className={styles.userButtonUsername}>
                    {user.username}
                  </span>
                </button>
                <ul className={`${styles.userContentList} ${userStyle}`}>
                  <li className={styles.subMenuItem}>
                    <Link href="/account" onClick={navigate}>
                      Account
                    </Link>
                  </li>
                  <li className={styles.subMenuItem}>
                    <Link href="/account/messages" onClick={navigate}>
                      Messages
                    </Link>
                  </li>
                  <li className={styles.subMenuItem}>
                    <Link href="/account/settings" onClick={navigate}>
                      Account Settings
                    </Link>
                  </li>
                  <li className={styles.subMenuButton}>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            </>
          )}
          {isWalletConnected && (
            <button
              className={`${styles.menuButton} ${styles.userButton}`}
              onClick={openWallet}
            >
              Wallet
            </button>
          )}
          {isLoggedIn() && !isWalletConnected && (
            <button
              className={`${styles.menuButton} ${styles.userButton}`}
              onClick={handleToggleBlockchain}
            >
              Connect Wallet
            </button>
          )}

          <Link href="/" className={styles.link} onClick={navigate}>
            Home
          </Link>
          <Link href="/vendors" className={styles.link} onClick={navigate}>
            Vendors
          </Link>
          <Link href="/help" className={styles.link} onClick={navigate}>
            Help
          </Link>
        </div>
      </aside>
    </>
  );
};

export default User;
