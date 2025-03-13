import {
  CreateOfferSetter,
  SetCreateOfferValue,
} from '@/zustand/createOffer/types';

export type CreateOfferTradeInstructionsProps = {
  setCreateOfferValue: SetCreateOfferValue;
  resetCreateOffer: () => void;
  toStep: (step: number) => void;
  createOffer: CreateOfferSetter;
  step: number;
  onClickEvents: { [key: number]: () => void };
  saveCreateOfferLocally: () => void;
};
