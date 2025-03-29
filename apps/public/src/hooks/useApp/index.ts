'use client';

import { useRootStore } from '@/store';

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
      checkIsMobile,
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
    checkIsMobile,
  };
};

export default useApp;
