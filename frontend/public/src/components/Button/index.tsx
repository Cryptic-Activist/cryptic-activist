import type { ButtonProps } from './types';
import type { FC } from 'react';
import Link from 'next/link';
import styles from './index.module.scss';

const Button: FC<ButtonProps> = ({
  children,
  type = 'button',
  href,
  theme = 'primary',
  padding,
  align = 'center',
  size = 16,
  fullWidth = false,
  isDisabled = false,
  className,
  onClick,
}) => {
  const primary = theme === 'primary' ? styles.primary : null;
  const secondary = theme === 'secondary' ? styles.secondary : null;
  const ghost = theme === 'ghost' ? styles.ghost : null;
  const danger = theme === 'danger' ? styles.danger : null;
  const alert = theme === 'alert' ? styles.alert : null;
  const transparent = theme === 'transparent' ? styles.transparent : null;
  const alignment =
    align === 'center' ? 'center' : align === 'left' ? 'start' : 'end';

  return (
    <>
      {href ? (
        <Link
          href={isDisabled ? '#' : href}
          className={`${styles.button} ${primary} ${secondary} ${ghost} ${danger} ${alert} ${transparent} ${className}`}
          style={{
            padding,
            textAlign: alignment,
            fontSize: `${size}px`,
            ...(fullWidth ? { width: '100%' } : {}),
            ...(isDisabled ? { cursor: 'auto' } : {}),
          }}
        >
          {children}
        </Link>
      ) : (
        <button
          type={type}
          className={`${styles.button} ${primary} ${secondary} ${ghost} ${danger} ${alert} ${transparent} ${className}`}
          onClick={onClick}
          disabled={isDisabled}
          style={{
            padding,
            textAlign: alignment,
            fontSize: `${size}px`,
            ...(fullWidth ? { width: '100%' } : {}),
            ...(isDisabled ? { cursor: 'auto' } : {}),
          }}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
