import { CreateOfferStore } from '@/store/createOffer/types';

export type TradeTimeProps = {
  createOffer: CreateOfferStore;
  inputTradeTimeLimit: (value: number) => void;
};
