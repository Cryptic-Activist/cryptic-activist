import { OfferStore } from './types';
import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';

export const useOfferStore: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  OfferStore
> = (set, get) => ({
  offer: {
    id: undefined,
    cryptocurrency: undefined,
    fiat: undefined,
    vendor: undefined,
    offerType: undefined,
    paymentMethodId: undefined,
    paymentMethod: undefined,
    pricingType: undefined,
    listAt: undefined,
    limitMin: undefined,
    limitMax: undefined,
    timeLimit: undefined,
    tags: undefined,
    label: undefined,
    terms: undefined,
    instructions: undefined,
    setOfferValue: (params, actionName = 'offer/setValue') => {
      set(
        ({ offer }) => ({
          offer: {
            ...offer,
            id: params.id ?? offer.id,
            cryptocurrency: params.cryptocurrency ?? offer.cryptocurrency,
            fiat: params.fiat ?? offer.fiat,
            vendor: params.vendor ?? offer.vendor,
            offerType: params.offerType ?? offer.offerType,
            paymentMethodId: params.paymentMethodId ?? offer.paymentMethodId,
            paymentMethod: params.paymentMethod ?? offer.paymentMethod,
            pricingType: params.pricingType ?? offer.pricingType,
            listAt: params.listAt ?? offer.listAt,
            limitMin: params.limitMin ?? offer.limitMin,
            limitMax: params.limitMax ?? offer.limitMax,
            timeLimit: params.timeLimit ?? offer.timeLimit,
            tags: params.tags ?? offer.tags,
            label: params.label ?? offer.label,
            terms: params.terms ?? offer.terms,
            instructions: params.instructions ?? offer.instructions,
          },
        }),
        false,
        actionName
      );
    },
    setOffer: (offer) => {
      const setValue = get().offer.setOfferValue;

      setValue(offer, 'offer/setOffer');
    },
    resetOffer: () => {
      const setValue = get().offer.setOfferValue;

      setValue({}, 'offer/resetOffer');
    },
  },
});
