import { OffersStore } from './types';
import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';

export const useOffersStore: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  OffersStore
> = (set, get) => ({
  offers: {
    data: [],
    cursor: null,
    hasMore: true,
    setOffersValue: ({
      value,
      actionName = 'offers/setValue',
      cursor,
      hasMore,
    }) => {
      set(
        ({ offers }) => ({
          offers: {
            ...offers,
            data: value.data ?? offers.data,
            cursor: cursor ?? offers.cursor,
            hasMore: hasMore ?? offers.hasMore,
          },
        }),
        false,
        actionName
      );
    },
    setOffers: async ({ offers, cursor }) => {
      const setValue = get().offers.setOffersValue;

      setValue({
        value: { data: offers },
        actionName: 'offers/setOffers',
        cursor,
      });
    },
    setHasMore: (hasMore: boolean) => {
      set(({ offers }) => ({
        offers: {
          ...offers,
          hasMore,
        },
      }));

      // setValue({ data: offers }, 'offers/setOffers', nextCursor);
    },
  },
});
