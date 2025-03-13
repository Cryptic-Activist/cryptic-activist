'use client';

import { useRootStore } from '@/zustand';

const useNavigationBar = () => {
  const { navigationBar } = useRootStore();
  const { drawers, modals, status, tooltips, ...navigationBarRest } =
    navigationBar;

  return {
    navigationBar: {
      drawers,
      modals,
      tooltips,
      status,
    },
    ...navigationBarRest,
  };
};

export default useNavigationBar;
