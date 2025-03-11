'use client';

import { useAppStore } from '@/zustand';

const useApp = () => {
  const {
    defaults,
    dimensions,
    isMobile,
    toasts,
    type,
    currentPrice,
    setCurrentPrice: setCurrentPriceStore,
    addToast,
    removeToast,
    setValue,
  } = useAppStore();

  const setCurrentPrice = async () => {
    if (defaults?.cryptocurrency?.coingeckoId && defaults?.fiat?.symbol) {
      setCurrentPriceStore(
        defaults?.cryptocurrency?.coingeckoId,
        defaults?.fiat?.symbol
      );
    }
  };

  return {
    app: {
      dimensions,
      isMobile,
      type,
      toasts,
      defaults,
      currentPrice,
    },
    setValue,
    setCurrentPrice,
    addToast,
    removeToast,
  };
};

export default useApp;
