import { CreateOfferState } from '@/store/createOffer/types';

export type TagsProps = {
  onChange: (item: string[]) => void;
  createOffer: CreateOfferState;
  id: string;
  label?: string;
  width?: string;
};
