import { CreateOfferState } from '@/store/createOffer/types';

export type TradeLimitProps = {
  createOffer: CreateOfferState;
  inputMinTradeAmount: (value: number) => void;
  inputMaxTradeAmount: (value: number) => void;
};
