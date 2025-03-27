'use client';

import { Button, ConnectedWallet } from '@/components';
import { menuList, menuUserList } from './data';
import {
  useBlockchain,
  useNavigationBar,
  useOutsideClick,
  useUser,
} from '@/hooks';

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
            <>{user.names?.firstName}</>
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
