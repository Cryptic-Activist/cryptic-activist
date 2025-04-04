import { Offer } from '@/store/offers/types';

export type CurrentOffersProps = {
  vendorId: string;
};

export type ItemProps = {
  offer: Offer;
  currentPrice?: number;
  isCurrentUser?: boolean;
};
