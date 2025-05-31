import { Filter } from '@/hooks/useMyOffers/types';

export type MyOfferItemProps = {
  offer: any;
  onDeleteOffer: (offerId: string) => void;
};

export type Filters = {
  label: string;
  filter: Filter;
}[];
