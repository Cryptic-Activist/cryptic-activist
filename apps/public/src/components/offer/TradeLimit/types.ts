import { CreateOfferProp } from '@/store/createOffer/types';

export type TradeLimitProps = {
  createOffer: CreateOfferProp;
  inputMinTradeAmount: (value: number) => void;
  inputMaxTradeAmount: (value: number) => void;
};
