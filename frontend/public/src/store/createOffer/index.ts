import { CreateOfferStore } from './types';
import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';

export const useCreateOfferSlice: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  CreateOfferStore
> = (set, get) => ({
  createOffer: {
    cryptocurrency: undefined,
    fiat: undefined,
    vendorId: undefined,
    offerType: undefined,
    paymentMethodId: undefined,
    paymentDetails: undefined,
    isPaymentMethodCompleted: undefined,
    pricingType: undefined,
    listAt: undefined,
    limitMin: undefined,
    limitMax: undefined,
    timeLimit: undefined,
    isTradePricingCompleted: undefined,
    tags: undefined,
    label: undefined,
    terms: undefined,
    instructions: undefined,
    isTradeInstructionsCompleted: undefined,
    isFilled: undefined,
    isSubmitted: undefined,
    setCreateOfferValue: (params, actionName = 'createOffer/setValue') => {
      set(
        ({ createOffer }) => ({
          createOffer: {
            ...createOffer,
            cryptocurrency: params.cryptocurrency ?? createOffer.cryptocurrency,
            fiat: params.fiat ?? createOffer.fiat,
            instructions: params.instructions ?? createOffer.instructions,
            isFilled: params.isFilled ?? createOffer.isFilled,
            isPaymentMethodCompleted:
              params.isPaymentMethodCompleted ??
              createOffer.isPaymentMethodCompleted,
            isSubmitted: params.isSubmitted ?? createOffer.isSubmitted,
            isTradeInstructionsCompleted:
              params.isTradeInstructionsCompleted ??
              createOffer.isTradeInstructionsCompleted,
            isTradePricingCompleted:
              params.isTradePricingCompleted ??
              createOffer.isTradePricingCompleted,
            label: params.label ?? createOffer.label,
            limitMax: params.limitMax ?? createOffer.limitMax,
            limitMin: params.limitMin ?? createOffer.limitMin,
            listAt: params.listAt ?? createOffer.listAt,
            offerType: params.offerType ?? createOffer.offerType,
            paymentMethodId:
              params.paymentMethodId ?? createOffer.paymentMethodId,
            paymentDetails: params.paymentDetails ?? createOffer.paymentDetails,
            pricingType: params.pricingType ?? createOffer.pricingType,
            tags: params.tags ?? createOffer.tags,
            terms: params.terms ?? createOffer.terms,
            timeLimit: params.timeLimit ?? createOffer.timeLimit,
            vendorId: params.vendorId ?? createOffer.vendorId,
          },
        }),
        false,
        actionName
      );
    },
    setCreateOffer: (createOffer) => {
      const setValue = get().createOffer.setCreateOfferValue;
      setValue({ ...createOffer }, 'createOffer/setCreateOffer');
    },
    resetCreateOffer: () => {
      set(
        ({ createOffer }) => ({
          createOffer: {
            ...createOffer,
            cryptocurrency: undefined,
            fiat: undefined,
            vendorId: undefined,
            offerType: undefined,
            paymentMethodId: undefined,
            paymentDetails: undefined,
            isPaymentMethodCompleted: undefined,
            pricingType: undefined,
            listAt: undefined,
            limitMin: undefined,
            limitMax: undefined,
            timeLimit: undefined,
            isTradePricingCompleted: undefined,
            tags: undefined,
            label: undefined,
            terms: undefined,
            instructions: undefined,
            isTradeInstructionsCompleted: undefined,
            isFilled: undefined,
            isSubmitted: undefined,
          },
        }),
        false,
        'createOffer/resetCreateOffer'
      );
    },
  },
});
