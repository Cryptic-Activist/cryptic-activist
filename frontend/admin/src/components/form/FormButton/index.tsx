import { FC } from 'react';

import { useNavigationBar } from '@/hooks';

import styles from './styles.module.scss';
import { FormButtonProps } from './types';

const FormButton: FC<FormButtonProps> = ({ modal, label }) => {
  const { handleOpenModal } = useNavigationBar();

  const handleToggle = () => {

    handleOpenModal(modal);
  };

  return (
    <button className={styles.link} onClick={handleToggle}>
      {label}
    </button>
  );
};

export default FormButton;
