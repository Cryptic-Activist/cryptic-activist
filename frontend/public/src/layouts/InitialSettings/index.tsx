'use client';

import { DEFAULT_CRYPTOCURRENCY_ID, DEFAULT_FIAT_SYMBOL } from '@/constants';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/utils';
import {
  useApp,
  useCryptocurrencies,
  useFiats,
  useNavigationBar,
  useNotificationSocket,
  usePaymentMethods,
  useURL,
  useUser,
} from '@/hooks';

import { CryptocurrencyParams } from '@/hooks/useCryptocurrencies/types';
import { FiatParams } from '@/hooks/useFiats/types';
import { Type } from '@/store/app/types';
import { useEffect } from 'react';

const InitialSettings = () => {
  const { getFiats, getFiat, fiats } = useFiats();
  const { getCryptocurrencies, getCryptocurrency, cryptocurrencies } =
    useCryptocurrencies();
  const { getPaymentMethods } = usePaymentMethods();
  const { setValue, setCurrentPrice, app, checkIsMobile, addToast } = useApp();
  const { user } = useUser();
  const {} = useNotificationSocket({ user });
  const { getSearchParams, clearSearchParams, searchParams } = useURL();
  const { toggleModal } = useNavigationBar();

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
    getCryptocurrencies();
    getFiats();
    getPaymentMethods();
  }, []);

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

  const handleAccountVerifedParam = () => {
    const isPasswordResetVerifiedParam = getSearchParams('account-verified');
    console.log({ isPasswordResetVerifiedParam });
    const isAccountVerified = Number(isPasswordResetVerifiedParam);
    if (isAccountVerified === 1) {
      addToast(
        'success',
        'Account verified successfully, you can login now',
        5000
      );
    } else if (isAccountVerified === 0) {
      addToast('error', 'Account verification failed', 5000);
    }
    clearSearchParams();
  };

  const handlePasswordResetVerifiedParam = () => {
    const isPasswordResetVerifiedParam = getSearchParams('reset-password');
    const isPasswordResetVerified = Number(isPasswordResetVerifiedParam);
    if (isPasswordResetVerified === 1) {
      toggleModal('resetPassword');
    } else if (isPasswordResetVerified === 0) {
      addToast('error', 'Password reset request is invalid', 5000);
    }
    clearSearchParams();
  };

  useEffect(() => {
    if (Object.keys(searchParams).length > 0) {
      handleAccountVerifedParam();
      handlePasswordResetVerifiedParam();
    }
  }, [searchParams]);

  return null;
};

export default InitialSettings;
