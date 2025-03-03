import { FC } from 'react';

import styles from './index.module.scss';
import { TooltipProps } from './types';

const Tooltip: FC<TooltipProps> = ({ children, position, spacing }) => {
  const getSpacing = () => {
    if (!position || !spacing) return '';

    if (position === 'bottom') {
      return `translateY(${spacing}px)`;
    } else if (position === 'top') {
      return `translateY(-${spacing}px)`;
    } else if (position === 'left') {
      return `translateX(-${spacing}px)`;
    } else if (position === 'right') {
      return `translationX(${spacing}px)`;
    }
  };

  return (
    <div className={styles.container}>
      {children[0]}
      <div className={styles.tooltip} style={{ transform: getSpacing() }}>
        {children[1]}
      </div>
    </div>
  );
};

export default Tooltip;
