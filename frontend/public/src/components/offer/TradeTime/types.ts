import { CreateOfferStore } from '@/zustand/createOffer/types';

export type TradeTimeProps = {
  createOffer: CreateOfferStore;
  inputTradeTimeLimit: (value: number) => void;
};
