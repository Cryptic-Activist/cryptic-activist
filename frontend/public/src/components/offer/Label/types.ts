import { CreateOfferStore } from '@/store/createOffer/types';

export type LabelProps = {
  onChange: (value: string) => void;
  createOffer: CreateOfferStore;
};
