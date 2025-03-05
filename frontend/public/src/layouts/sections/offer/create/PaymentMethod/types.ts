import {
  CreateOfferState,
  SetCreateOfferValues,
} from '@/store/createOffer/types';

export type CreateOfferPaymentMethodProps = {
  setCreateOfferValues: SetCreateOfferValues;
  createOffer: CreateOfferState;
};
