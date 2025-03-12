'use client';

import { useRootStore } from '@/zustand';

const useApp = () => {
  const {
    app: {
      defaults,
      dimensions,
      isMobile,
      toasts,
      type,
      currentPrice,
      setCurrentPrice: setCurrentPriceStore,
      addToast,
      removeToast,
      setAppValue,
    },
  } = useRootStore();

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
    setValue: setAppValue,
    setCurrentPrice,
    addToast,
    removeToast,
  };
};

export default useApp;
