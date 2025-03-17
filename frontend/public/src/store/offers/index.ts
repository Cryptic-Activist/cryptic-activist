import { OffersStore } from './types';
import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';
import { fetchOffers } from '@/services/offers';

export const useOffersStore: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  OffersStore
> = (set, get) => ({
  offers: {
    data: undefined,
    setOffersValue: (params, actionName = 'offers/setValue') => {
      set(
        ({ offers }) => ({
          offers: {
            ...offers,
            data: params.data ?? offers.data,
          },
        }),
        false,
        actionName
      );
    },
    setOffers: async (offers) => {
      const setValue = get().offers.setOffersValue;

      setValue({ data: offers }, 'offers/setOffers');
    },
  },
});
