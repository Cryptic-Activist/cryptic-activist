'use client';

import { useRootStore } from '@/store';

const useNotification = () => {
  const { notifications } = useRootStore();

  return { notifications };
};

export default useNotification;
