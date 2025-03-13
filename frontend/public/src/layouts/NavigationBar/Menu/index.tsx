'use client';

import { Button, ConnectedWallet, Tooltip } from '@/components';
import { menuList, menuUserList } from './data';
import {
  useBlockchain,
  useNavigationBar,
  useOutsideClick,
  useUser,
} from '@/hooks';

import { FaWallet } from 'react-icons/fa6';
import { MenuList } from '@/layouts/tooltips';
import styles from './index.module.scss';

const Menu = () => {
  const {
    navigationBar: {
      drawers: { user: userDrawer },
    },
    toggleDrawer,
    toggleModal,
  } = useNavigationBar();
  const {
    user,
    mutation: userMutation,
    query: userQuery,
    isLoggedIn,
  } = useUser();
  const { blockchain, isWalletConnected } = useBlockchain();

  const handleToggleUserDrawer = () => {
    toggleDrawer('user');
  };

  const handleToggleLogin = () => {
    toggleModal('login');
  };

  const handleToggleBlockchain = () => {
    toggleModal('blockchain');
  };

  const ref = useOutsideClick(handleToggleUserDrawer);

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
      <Tooltip position="bottom" spacing={55}>
        {isLoggedIn() ? (
          <Button theme="transparent" onClick={handleToggleUserDrawer}>
            <>{user.names?.firstName}</>
          </Button>
        ) : (
          <Button theme="transparent" onClick={handleToggleLogin}>
            {userQuery.isPending ? 'Loading' : ''}
            {userQuery.isSuccess ? 'Login' : ''}
          </Button>
        )}
        {userDrawer ? (
          <>
            {/* @ts-ignore */}
            <MenuList ref={ref} items={menuUserList} />
          </>
        ) : (
          <></>
        )}
      </Tooltip>
    </div>
  );
};

export default Menu;
