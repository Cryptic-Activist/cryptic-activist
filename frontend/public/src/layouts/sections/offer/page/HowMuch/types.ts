import { FormEvent } from 'react';
import { OfferSetter } from '@/store/offer/types';
import { UseQueryResult } from '@tanstack/react-query';

export type HowMuchProps = {
  offer: OfferSetter;
  queryOffer: UseQueryResult<any, Error>;
  onChange: (value: number) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  createTrade: {
    fiatAmount: number;
    willReceiveFiat: number;
    cryptocurrencyAmount?: number;
    isTradeAvailability: boolean;
  };
};
