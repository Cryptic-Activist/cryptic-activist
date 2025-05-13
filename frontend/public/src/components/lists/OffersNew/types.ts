import { AppStoreSetter } from '@/store/app/types';
import { Offer } from '@/store/offers/types';

export type OfferItemProps = {
  offer: Offer;
  app: AppStoreSetter;
};

export type FilterSectionProps = {
  app: AppStoreSetter;
  offers: any;
  setValue: any;
  paymentMethods: any;
  updateHeight: (isMoreFiltersOpen: boolean) => void;
};

export type OffersNewProps = {
  id: 'home' | 'vendors';
  height: string;
};
