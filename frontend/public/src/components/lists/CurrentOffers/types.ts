import { Offer } from '@/store/offers/types';
import { Type } from '@/store/app/types';

export type CurrentOffersProps = {
  vendorId: string;
};

export type ItemProps = {
  offer: Offer;
  currentPrice?: number;
  isCurrentUser?: boolean;
};
