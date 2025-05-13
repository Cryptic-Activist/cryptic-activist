import { Offer, OffersStore } from '@/store/offers/types';

import { AppStoreSetter } from '@/store/app/types';

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
