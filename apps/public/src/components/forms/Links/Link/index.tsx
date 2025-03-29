import { default as NextLink } from 'next/link';
import type { FC } from 'react';

import styles from './index.module.scss';
import type { LinkProps } from './types';

const Link: FC<LinkProps> = ({ href, label, type = 'button', onClick }) => {
  return (
    <>
      {type === 'button' && href ? (
        <NextLink href={href} className={styles.link}>
          {label}
        </NextLink>
      ) : (
        <button className={styles.link} onClick={onClick}>
          {label}
        </button>
      )}
    </>
  );
};

export default Link;
