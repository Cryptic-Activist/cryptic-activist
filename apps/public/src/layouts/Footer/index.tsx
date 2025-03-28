import { Brand } from '@/components';
import { APP_NAME } from '@/constants';

import Links from './Links';

import styles from './index.module.scss';
import { links } from './links';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandLinksContainer}>
          <Brand />
          <Links links={links} />
        </div>
        <p className={styles.statement}>
          &copy;{` ${currentYear} ${APP_NAME} - All right reserved`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
