'use client';

import { Fiat } from '@/store/fiat/types';
import { FiatSymbol } from './types';
import { toLowerCase } from '@/utils';
import { useApp } from '@/hooks';
import { useRootStore } from '@/store';
import { useState } from 'react';

const useFiats = () => {
  const { setValue } = useApp();
  const { fiats } = useRootStore();
  const [fiatsList, setFiatsList] = useState(fiats.data);

  const getFiat = (symbol: FiatSymbol) => {
    if (!fiats.data) {
      return null;
    }

    const fiat = fiats.data.filter((f) => f.symbol === symbol);

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
        `${lowerFiatSymbol} - ${lowerFiatName}`.includes(lowerTerm)
      );
    });

    setFiatsList(filtered);
  };

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
