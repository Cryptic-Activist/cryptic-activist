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
      referralCode,
      setCurrentPrice: setCurrentPriceStore,
      addToast,
      removeToast,
      setAppValue,
      checkIsMobile,
      setReferralCode,
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
      referralCode,
    },
    setValue: setAppValue,
    setCurrentPrice,
    addToast,
    removeToast,
    checkIsMobile,
    setReferralCode,
  };
};

export default useApp;
