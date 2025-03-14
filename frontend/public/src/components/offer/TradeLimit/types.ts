import { CreateOfferStore } from '@/store/createOffer/types';

export type TradeLimitProps = {
  createOffer: CreateOfferStore;
  inputMinTradeAmount: (value: number) => void;
  inputMaxTradeAmount: (value: number) => void;
};
