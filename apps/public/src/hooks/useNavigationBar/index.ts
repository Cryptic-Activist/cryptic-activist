'use client';

import { useRootStore } from '@/store';

const useNavigationBar = () => {
  const { navigationBar } = useRootStore();
  const { drawers, modals, status, tooltips, ...navigationBarRest } =
    navigationBar;

  const handleToggleDrawer = () => {
    navigationBar.toggleDrawer('user');
  };

  return {
    navigationBar: {
      drawers,
      modals,
      tooltips,
      status,
    },
    ...navigationBarRest,
    handleToggleDrawer,
  };
};

export default useNavigationBar;
