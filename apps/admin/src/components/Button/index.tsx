import Link from 'next/link';
import type { FC } from 'react';

import styles from './index.module.scss';
import { ButtonProps } from './types';

const Button: FC<ButtonProps> = ({
  children,
  type = 'button',
  href,
  theme = 'primary',
  padding,
  align = 'center',
  onClick,
}) => {
  const primary = theme === 'primary' ? styles.primary : null;
  const secondary = theme === 'secondary' ? styles.secondary : null;
  const ghost = theme === 'ghost' ? styles.ghost : null;
  const transparent = theme === 'transparent' ? styles.transparent : null;
  const alignment =
    align === 'center' ? 'center' : align === 'left' ? 'start' : 'end';

  return (
    <>
      {href ? (
        <Link
          href={href}
          className={`${styles.button} ${primary} ${secondary} ${ghost} ${transparent}`}
          style={{
            padding,
            textAlign: alignment,
          }}
        >
          {children}
        </Link>
      ) : (
        <button
          type={type}
          className={`${styles.button} ${primary} ${secondary} ${ghost} ${transparent}`}
          onClick={onClick}
          style={{
            padding,
            textAlign: alignment,
          }}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
