'use client';

import { FiatList, FiatParams } from './types';
import { setLocalStorage, toLowerCase } from '@/utils';
import { useEffect, useState } from 'react';

import { Fiat } from '@/store/fiat/types';
import countryFlags from './countryFlags';
import { useApp } from '@/hooks';
import { useRootStore } from '@/store';

const useFiats = () => {
  const { setValue } = useApp();
  const { fiats } = useRootStore();
  const [fiatsList, setFiatsList] = useState<FiatList>([]);

  const getFiat = (params: FiatParams) => {
    if (!fiats.data) {
      return null;
    }

    const fiat = fiats.data.filter((f) => {
      if (params.id) {
        return f.id === params.id;
      } else if (params.name) {
        return f.name === params.name;
      } else if (params.symbol) {
        return f.symbol === params.symbol;
      }
    });

    const hasFound = fiat.length > 0;

    if (!hasFound) {
      return null;
    }

    return fiat[0];
  };

  const setFiat = (fiat: Fiat) => {
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
  };

  const filter = (list: FiatList) => {
    const newList = list.map((item) => ({
      flag: countryFlags[item.country],
      country: item.country,
      name: item.name,
      id: item.id,
      symbol: item.symbol,
    }));

    return newList;
  };

  const filterFiats = (term: string) => {
    if (!fiats.data) return;
    const filtered = fiats.data.filter((fiat) => {
      const lowerFiatName = toLowerCase(fiat.name);
      const lowerFiatSymbol = toLowerCase(fiat.symbol);
      const lowerTerm = toLowerCase(term);

      return (
        lowerFiatName.includes(lowerTerm) ||
        lowerFiatSymbol.includes(lowerTerm) ||
        `${lowerFiatSymbol} ${lowerFiatName}`.includes(lowerTerm)
      );
    });

    const newList = filter(filtered as FiatList);
    setFiatsList(newList);
  };

  useEffect(() => {
    if (fiats.data) {
      const list = filter(fiats.data as FiatList);
      setFiatsList(list);
    }
  }, [fiats.data]);

  return {
    fiats,
    fiatsList,
    getFiats: fiats.getFiats,
    getFiat,
    setFiat,
    filterFiats,
  };
};

export default useFiats;
