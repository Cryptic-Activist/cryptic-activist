import { FormEvent } from 'react';
import { OfferSetter } from '@/store/offer/types';
import { UseQueryResult } from '@tanstack/react-query';
import { UserSetter } from '@/store/user/types';

export type HowMuchProps = {
  user: UserSetter;
  offer: OfferSetter;
  queryOffer: UseQueryResult<any, Error>;
  onChange: (value: number) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  createTrade: {
    cryptocurrencyAmount?: number;
    fiatAmount: number;
    receivingFiatAmount?: number | null;
  };
};
