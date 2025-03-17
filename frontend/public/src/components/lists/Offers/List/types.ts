import { Offer } from '@/store/offers/types';
import { Type } from '@/store/app/types';

export type ListProps = {
  currentPrice?: number;
  type: Type;
};

export type ItemProps = {
  offer: Offer;
  currentPrice?: number;
  type: Type;
};

export type RatesProps = {
  offer: Offer;
  currentPrice?: number;
};
