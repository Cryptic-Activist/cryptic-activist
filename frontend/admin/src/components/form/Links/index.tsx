import type { FC } from 'react';

import Link from './Link';
import styles from './index.module.scss';
import type { LinksProps } from './types';

const Links: FC<LinksProps> = ({ links }) => (
  <div className={styles.links}>
    {links.map(({ label, onClick }, index) => (
      <Link label={label} onClick={onClick} key={index} />
    ))}
  </div>
);

export default Links;
