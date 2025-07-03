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
      settings,
      setCurrentPrice: setCurrentPriceStore,
      addToast,
      removeToast,
      setAppValue,
      checkIsMobile,
      setReferralCode,
      setSettings,
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
      settings,
    },
    setValue: setAppValue,
    setCurrentPrice,
    addToast,
    removeToast,
    checkIsMobile,
    setReferralCode,
    setSettings,
  };
};

export default useApp;
