import { Brand } from '@/components';

import Menu from './Menu';
import Search from './Search';

import styles from './index.module.scss';

const NavigationBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Brand />
        <div className={styles.searchMenu}>
          <Search />
          <Menu />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
