'use client';

import {
  $navigationBar,
  resetNavigationBar,
  toggleDrawer,
  toggleModal,
  toggleTooltip,
} from '@/store';
import { Drawer, Modal } from '@/store/navigationBar/types';
import { useStore } from '@nanostores/react';

const useNavigationBar = () => {
  const navigationBar = useStore($navigationBar);

  return {
    navigationBar,
    toggleDrawer,
    toggleModal,
    toggleTooltip,
    resetNavigationBar,
  };
};

export default useNavigationBar;
