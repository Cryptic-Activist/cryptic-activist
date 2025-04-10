import { FC, forwardRef } from 'react';
import {
  useBlockchain,
  useNavigationBar,
  useNotification,
  useUser,
} from '@/hooks';

import { FaCircle } from 'react-icons/fa6';
import Link from 'next/link';
import type { MenuListProps } from './types';
import styles from './index.module.scss';
import { useRootStore } from '@/store';

const MenuList: FC<MenuListProps> = forwardRef(({ items }, ref: any) => {
  const { logout } = useUser();
  const { toggleTooltip } = useNavigationBar();
  const { onDisconnectWallet } = useBlockchain();
  const { notifications } = useNotification();
  const {
    navigationBar: { resetNavigationBar },
  } = useRootStore();

  const handleLogout = () => {
    resetNavigationBar();
    onDisconnectWallet();
    logout();
  };

  const handleClick = (label: string) => {
    toggleTooltip('user');
    if (notifications.hasNewNotification && label === 'Messages') {
      notifications.setHasNewNotification(false);
    }
  };

  return (
    <ul className={styles.container} ref={ref}>
      {items.map(({ label, href }, index) => (
        <li
          key={index}
          onClick={() => {
            handleClick(label);
          }}
        >
          <Link href={href}>{label}</Link>
          {notifications.hasNewNotification && label === 'Messages' ? (
            <span className={styles.notificationInidicator}>
              <FaCircle size={7} />
            </span>
          ) : (
            ''
          )}
        </li>
      ))}
      <li>
        <button onClick={handleLogout}>Logout</button>
      </li>
    </ul>
  );
});

MenuList.displayName = 'MenuList';

export default MenuList;
