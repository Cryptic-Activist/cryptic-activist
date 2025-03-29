import { CreateOfferProp } from '@/store/createOffer/types';

export type TradeTimeProps = {
  createOffer: CreateOfferProp;
  inputTradeTimeLimit: (value: number) => void;
};
