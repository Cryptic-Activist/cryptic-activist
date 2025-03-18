'use client';

import { Button, ConnectedWallet, Tooltip } from '@/components';
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
  const {
    user,
    mutation: userMutation,
    query: userQuery,
    isLoggedIn,
  } = useUser();
  const { blockchain, isWalletConnected } = useBlockchain();

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
      <Tooltip position="bottom" spacing={55}>
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
