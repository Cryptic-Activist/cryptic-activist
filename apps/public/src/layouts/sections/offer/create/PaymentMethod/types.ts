import {
  CreateOfferSetter,
  SetCreateOfferValue,
} from '@/store/createOffer/types';

export type CreateOfferPaymentMethodProps = {
  setCreateOfferValue: SetCreateOfferValue;
  toStep: (step: number) => void;
  createOffer: CreateOfferSetter;
  step: number;
  onClickEvents: { [key: number]: () => void };
  saveCreateOfferLocally: () => void;
};
