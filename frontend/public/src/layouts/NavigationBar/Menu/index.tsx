'use client';

import { Button, ConnectedWallet } from '@/components';
import { menuList, menuUserList } from './data';
import {
  useBlockchain,
  useNavigationBar,
  useNotification,
  useOutsideClick,
  useUser,
} from '@/hooks';

import { FaCircle } from 'react-icons/fa6';
import { MenuList } from '@/layouts/tooltips';
import styles from './index.module.scss';

const Menu = () => {
  const {
    navigationBar: {
      tooltips: { user: userTooltip },
    },
    toggleModal,
    toggleTooltip,
  } = useNavigationBar();
  const { user, query: userQuery, isLoggedIn } = useUser();
  const { isWalletConnected } = useBlockchain();
  const { notifications } = useNotification();

  const handleToggleUserTooltip = () => {
    toggleTooltip('user');
  };

  const handleToggleLogin = () => {
    toggleModal('login');
  };

  const handleToggleBlockchain = () => {
    toggleModal('blockchain');
  };

  const ref = useOutsideClick(handleToggleUserTooltip);

  return (
    <div className={styles.menu}>
      {menuList.map(({ href, label }, index) => (
        <Button href={href} key={index}>
          {label}
        </Button>
      ))}
      {isLoggedIn() && !isWalletConnected && (
        <Button
          theme="transparent"
          type="button"
          onClick={handleToggleBlockchain}
        >
          Connect Wallet
        </Button>
      )}
      {isWalletConnected && <ConnectedWallet />}
      <div className={styles.tooltipContainer}>
        {isLoggedIn() ? (
          <Button theme="transparent" onClick={handleToggleUserTooltip}>
            <div className={styles.nameIndicatorContainer}>
              <span>{user.names?.firstName}</span>
              <span className={styles.notificationInidicator}>
                {notifications.hasNewNotification ? <FaCircle size={7} /> : ''}
              </span>
            </div>
            <></>
          </Button>
        ) : (
          <Button theme="transparent" onClick={handleToggleLogin}>
            {userQuery.isPending ? 'Loading' : ''}
            {userQuery.isSuccess ? 'Login' : ''}
          </Button>
        )}
        {userTooltip ? (
          <div className={styles.tooltip}>
            <MenuList ref={ref} items={menuUserList} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Menu;
