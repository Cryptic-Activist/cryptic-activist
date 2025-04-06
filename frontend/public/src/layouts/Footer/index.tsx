import { APP_NAME } from '@/constants';
import { Brand } from '@/components';
import Links from './Links';
import { links } from './links';
import styles from './index.module.scss';

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
          &copy;{` ${currentYear} ${APP_NAME} - All rights reserved`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
