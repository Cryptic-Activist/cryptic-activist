import { CreateOfferStore } from '@/zustand/createOffer/types';

export type LabelProps = {
  onChange: (value: string) => void;
  createOffer: CreateOfferStore;
};
