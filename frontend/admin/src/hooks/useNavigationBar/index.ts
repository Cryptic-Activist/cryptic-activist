import { useStore } from '@nanostores/react';

import { closeModal, navigationBar, openModal } from '@/stores/navigationBar';
import type { ToggleModalParams } from '@/stores/navigationBar/types';

const useNavigationBar = () => {
  const $navigationBar = useStore(navigationBar);

  const handleOpenModal = (params: ToggleModalParams) => {
    openModal(params);
  };

  const handleCloseModal = () => {
    closeModal();
  };

  return { navigationBar: $navigationBar, handleOpenModal, handleCloseModal };
};

export default useNavigationBar;
