'use client';

import {
  $app,
  addToast,
  removeToast,
  setCurrentPrice as setCurrentPriceStore,
  setValue,
} from '@/store';

import { useStore } from '@nanostores/react';

const useApp = () => {
  const app = useStore($app);

  const setCurrentPrice = async () => {
    if (
      app.defaults?.cryptocurrency?.coingeckoId &&
      app.defaults?.fiat?.symbol
    ) {
      setCurrentPriceStore(
        app.defaults?.cryptocurrency?.coingeckoId,
        app.defaults?.fiat?.symbol
      );
    }
  };

  return { app, setValue, setCurrentPrice, addToast, removeToast };
};

export default useApp;
