import { CreateOfferStore } from '@/zustand/createOffer/types';

export type TradeLimitProps = {
  createOffer: CreateOfferStore;
  inputMinTradeAmount: (value: number) => void;
  inputMaxTradeAmount: (value: number) => void;
};
