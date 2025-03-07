import { CreateOfferState } from '@/store/createOffer/types';

export type TradeTimeProps = {
  createOffer: CreateOfferState;
  inputTradeTimeLimit: (value: number) => void;
};
