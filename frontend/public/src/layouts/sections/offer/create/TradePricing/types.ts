import {
  CreateOfferSetter,
  SetCreateOfferValue,
} from '@/zustand/createOffer/types';

export type CreateOfferTradePricingProps = {
  setCreateOfferValue: SetCreateOfferValue;
  toStep: (step: number) => void;
  createOffer: CreateOfferSetter;
  step: number;
  onClickEvents: { [key: number]: () => void };
  saveCreateOfferLocally: () => void;
};
