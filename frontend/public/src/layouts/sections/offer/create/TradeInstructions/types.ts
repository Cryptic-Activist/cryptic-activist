import {
  CreateOfferSetter,
  SetCreateOfferValue,
} from '@/store/createOffer/types';

export type CreateOfferTradeInstructionsProps = {
  setCreateOfferValue: SetCreateOfferValue;
  resetCreateOffer: () => void;
  toStep: (step: number) => void;
  createOffer: CreateOfferSetter;
  step: number;
  onClickEvents: { [key: number]: () => void };
  saveCreateOfferLocally: () => void;
  vendorWalletAddress?: string;
};
