import { FC, forwardRef } from 'react';
import { useBlockchain, useNavigationBar, useUser } from '@/hooks';

import Link from 'next/link';
import type { MenuListProps } from './types';
import styles from './index.module.scss';
import { useRootStore } from '@/store';

const MenuList: FC<MenuListProps> = forwardRef(({ items }, ref: any) => {
  const { logout } = useUser();
  const { toggleTooltip } = useNavigationBar();
  const { onDisconnectWallet } = useBlockchain();
  const {
    navigationBar: { resetNavigationBar },
  } = useRootStore();

  const handleLogout = () => {
    resetNavigationBar();
    onDisconnectWallet();
    logout();
  };

  return (
    <ul className={styles.container} ref={ref}>
      {items.map(({ label, href }, index) => (
        <li key={index} onClick={() => toggleTooltip('user')}>
          <Link href={href}>{label}</Link>
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
