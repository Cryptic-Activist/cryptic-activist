import Link from 'next/link';
import { FC, forwardRef } from 'react';

import { useBlockchain, useNavigationBar, useUser } from '@/hooks';
import styles from './index.module.scss';
import type { MenuListProps } from './types';
import { resetNavigationBar } from '@/store';

const MenuList: FC<MenuListProps> = forwardRef(({ items }, ref: any) => {
  const { logout } = useUser();
  const { toggleDrawer } = useNavigationBar();
  const { onDisconnectWallet } = useBlockchain();

  const handleLogout = () => {
    resetNavigationBar();
    onDisconnectWallet();
    logout();
  };

  return (
    <ul className={styles.container} ref={ref}>
      {items.map(({ label, href }, index) => (
        <li key={index} onClick={() => toggleDrawer('user')}>
          <Link href={href}>{label}</Link>
        </li>
      ))}
      <li>
        <button onClick={handleLogout}>Logout</button>
      </li>
    </ul>
  );
});

export default MenuList;
