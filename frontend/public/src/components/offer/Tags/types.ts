import { CreateOfferStore } from '@/zustand/createOffer/types';

export type TagsProps = {
  onChange: (item: string[]) => void;
  createOffer: CreateOfferStore;
};
