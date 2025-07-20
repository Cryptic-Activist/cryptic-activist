'use client';

import {
  ChainParams,
  CryptocurrencyParams,
} from '@/hooks/useCryptocurrencies/types';
import {
  DEFAULT_CHAIN_ID,
  DEFAULT_CRYPTOCURRENCY_ID,
  DEFAULT_FIAT_SYMBOL,
} from '@/constants';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/utils';
import {
  useApp,
  useCryptocurrencies,
  useFiats,
  useNotificationSocket,
  useParams,
  usePaymentMethods,
  useTiers,
  useUser,
} from '@/hooks';

import { FiatParams } from '@/hooks/useFiats/types';
import { Type } from '@/store/app/types';
import useABIs from '@/hooks/useContracts';
import { useEffect } from 'react';

const InitialSettings = () => {
  const { getFiats, getFiat, fiats } = useFiats();
  const {
    getCryptocurrencies,
    getCryptocurrency,
    cryptocurrencies,
    getChains,
    getChain,
    chains,
  } = useCryptocurrencies();
  const { getPaymentMethods } = usePaymentMethods();
  const { setValue, setCurrentPrice, app, checkIsMobile, setSettings } =
    useApp();
  const { user } = useUser();
  const {} = useNotificationSocket({ user });
  const {} = useParams();
  const {} = useABIs();
  const {} = useTiers();

  const setDefaultCryptocurrency = (params: CryptocurrencyParams) => {
    const cryptocurrency = getCryptocurrency(params);

    if (!cryptocurrency) {
      removeLocalStorage('DEFAULT_CRYPTOCURRENCY_ID');
      return false;
    }

    if (cryptocurrency) {
      setValue(
        {
          defaults: {
            cryptocurrency: {
              coingeckoId: cryptocurrency.coingeckoId,
              id: cryptocurrency.id,
              name: cryptocurrency.name,
              symbol: cryptocurrency.symbol,
              image: cryptocurrency.image,
            },
          },
        },
        'app/setDefaultCryptocurrency'
      );
      setLocalStorage('DEFAULT_CRYPTOCURRENCY_ID', cryptocurrency.id);
      return true;
    }
  };

  const setDefaultChain = (params: ChainParams) => {
    const chain = getChain(params);

    if (!chain) {
      removeLocalStorage('DEFAULT_CHAIN_ID');
      return false;
    }

    if (chain) {
      setValue(
        {
          defaults: {
            chain: {
              coingeckoId: chain.coingeckoId,
              id: chain.id,
              name: chain.name,
              symbol: chain.symbol,
              logoUrl: chain.logoUrl,
              chainId: chain.chainId,
              description: chain.description,
            },
          },
        },
        'app/setDefaultChain'
      );
      setLocalStorage('DEFAULT_CHAIN_ID', chain.id);
      return true;
    }
  };

  const setDefaultFiat = (params: FiatParams) => {
    const fiat = getFiat(params);

    if (!fiat) {
      removeLocalStorage('DEFAULT_FIAT_ID');
      return false;
    }

    if (fiat) {
      setValue(
        {
          defaults: {
            fiat: {
              id: fiat.id,
              name: fiat.name,
              symbol: fiat.symbol,
              country: fiat.country,
            },
          },
        },
        'app/setDefaultFiat'
      );
      setLocalStorage('DEFAULT_FIAT_ID', fiat.id);
      return true;
    }
  };

  const handleResize = () => {
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;

    checkIsMobile({ width: currentWidth, height: currentHeight });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    getFiats();
    getPaymentMethods();
    getChains();
    setSettings();
  }, []);

  useEffect(() => {
    if (app.defaults.chain?.chainId) {
      getCryptocurrencies(app.defaults.chain.chainId);
    }
  }, [app.defaults.chain?.chainId]);

  useEffect(() => {
    if (cryptocurrencies.data) {
      const localStorageCryptocurrency = getLocalStorage(
        'DEFAULT_CRYPTOCURRENCY_ID'
      );

      if (localStorageCryptocurrency) {
        const maxAttempts = 1;
        for (let i = 0; i < maxAttempts; i++) {
          const wasSet = setDefaultCryptocurrency({
            id: localStorageCryptocurrency,
          });

          if (wasSet) {
            return;
          }

          i++;
        }
        return;
      }

      setDefaultCryptocurrency({ coingeckoId: DEFAULT_CRYPTOCURRENCY_ID });
    }
  }, [cryptocurrencies.data]);

  useEffect(() => {
    if (chains.data) {
      const localStorageChain = getLocalStorage('DEFAULT_CHAIN_ID');

      if (localStorageChain) {
        const maxAttempts = 1;
        for (let i = 0; i < maxAttempts; i++) {
          const wasSet = setDefaultChain({
            id: localStorageChain,
          });

          if (wasSet) {
            return;
          }

          i++;
        }
        return;
      }

      setDefaultChain({ chainId: DEFAULT_CHAIN_ID });
    }
  }, [chains.data]);

  useEffect(() => {
    if (fiats.data) {
      const localStorageFiat = getLocalStorage('DEFAULT_FIAT_ID');

      if (localStorageFiat) {
        const maxAttempts = 1;
        for (let i = 0; i < maxAttempts; i++) {
          const wasSet = setDefaultFiat({ id: localStorageFiat });

          if (wasSet) {
            return;
          }

          i++;
        }
        return;
      }

      setDefaultFiat({ symbol: DEFAULT_FIAT_SYMBOL });
    }
  }, [fiats.data]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localStorageAppType = getLocalStorage('APP_TYPE');
      setValue({ type: localStorageAppType as Type });
    }
  }, [typeof window]);

  useEffect(() => {
    setCurrentPrice();
  }, [app.defaults.cryptocurrency?.coingeckoId, app.defaults.fiat?.symbol]);

  return null;
};

export default InitialSettings;
