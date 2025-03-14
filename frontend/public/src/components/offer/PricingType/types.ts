import { CreateOfferStore } from '@/zustand/createOffer/types';

export type PricingItem = {
  label: 'Market' | 'Fixed';
  value: 'market' | 'fixed';
};

export type PricingTypeProps = {
  onChange: (item: PricingItem) => void;
  createOffer: CreateOfferStore;
};
