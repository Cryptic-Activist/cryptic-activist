import { CreateOfferStore } from '@/store/createOffer/types';

export type TagsProps = {
  onChange: (item: string[]) => void;
  createOffer: CreateOfferStore;
};
