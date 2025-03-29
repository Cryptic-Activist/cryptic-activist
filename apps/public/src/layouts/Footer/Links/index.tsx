'use client';

import Link from 'next/link';
import { FC } from 'react';

import styles from './index.module.scss';
import { LinksProps } from './types';

const Links: FC<LinksProps> = ({ links }) => {
  return (
    <div className={styles.sideLinks}>
      {links.map(({ heading, links }, index) => (
        <div className={styles.linksContainer} key={index}>
          <h3 className={styles.heading}>{heading}</h3>
          <ul className={styles.list}>
            {links.map(({ label, href }, index) => (
              <li key={index}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Links;
