import { AppStoreSetter } from '@/store/app/types';
import { Offer } from '@/store/offers/types';

export type OfferItemProps = {
  offer: Offer;
  app: AppStoreSetter;
};

export type FilterSectionProps = {
  app: AppStoreSetter;
  setValue: any;
};

export type OffersNewProps = {
  id: string;
  height: string;
};
