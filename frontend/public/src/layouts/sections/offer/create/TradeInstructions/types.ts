import {
  CreateOfferState,
  SetCreateOfferValues,
} from '@/store/createOffer/types';

export type CreateOfferTradeInstructionsProps = {
  setCreateOfferValues: SetCreateOfferValues;
  toStep: (step: number) => void;
  createOffer: CreateOfferState;
  step: number;
  onClickEvents: { [key: number]: () => void };
};
