'use client';

import { useApp, useNavigationBar } from '@/hooks';

import { Brand } from '@/components';
import { FaBars } from 'react-icons/fa6';
import Menu from './Menu';
// import Search from './Search';
import styles from './index.module.scss';

const NavigationBar = () => {
  const { app } = useApp();
  const { handleToggleDrawer } = useNavigationBar();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Brand />
        {app.isMobile ? (
          <>
            <button
              className={styles.drawerToggler}
              onClick={handleToggleDrawer}
            >
              <FaBars size={24} />
            </button>
          </>
        ) : (
          <div className={styles.searchMenu}>
            {/* <Search /> */}
            <Menu />
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
