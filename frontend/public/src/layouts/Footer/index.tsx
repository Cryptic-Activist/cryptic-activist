import { Brand, DynamicIcon } from '@/components';
import { links, socialMedias } from './links';

import { APP_NAME } from '@/constants';
import Links from './Links';
import styles from './index.module.scss';

const SocialMedias = () => (
  <ul className={styles.socialMedias}>
    {socialMedias.map((socialMedia, index) => (
      <li key={index}>
        <a href={socialMedia.href} target="_blank">
          <DynamicIcon iconName={socialMedia.iconName} />
        </a>
      </li>
    ))}
  </ul>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandLinksContainer}>
          <div className={styles.brandSocialMediaContainer}>
            <Brand />
            <SocialMedias />
          </div>
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
