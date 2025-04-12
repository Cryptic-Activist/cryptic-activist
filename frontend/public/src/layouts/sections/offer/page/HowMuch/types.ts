import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';

import { BlockchainSetter } from '@/store/blockchain/types';
import { FormEvent } from 'react';
import { OfferSetter } from '@/store/offer/types';
import { StartTradeParam } from '@/services/trade/types';
import { UserSetter } from '@/store/user/types';

export type HowMuchProps = {
  user: UserSetter;
  offer: OfferSetter;
  queryOffer: UseQueryResult<any, Error>;
  onChange: (value: number) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoggedIn: () => boolean;
  mutationStartTrade: UseMutationResult<any, Error, StartTradeParam, unknown>;
  blockchain: BlockchainSetter;
  createTrade: {
    cryptocurrencyAmount?: number;
    fiatAmount: number;
    receivingFiatAmount?: number | null;
    isTradingAvailable: boolean;
  };
};
