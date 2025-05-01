import { MyOffersStore } from './types';
import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';

export const useMyOffersSlice: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  MyOffersStore
> = (set, get) => ({
  myOffers: {
    data: [],
    cursor: null,
    hasMore: true,
    hasError: false,
    setMyOffersValue: ({
      value,
      actionName = 'myOffers/setValue',
      cursor,
      hasMore,
    }) => {
      set(
        ({ myOffers }) => ({
          myOffers: {
            ...myOffers,
            data: value.data ?? myOffers.data,
            cursor: cursor ?? myOffers.cursor,
            hasMore: hasMore ?? myOffers.hasMore,
          },
        }),
        false,
        actionName
      );
    },
    setMyOffers: async ({ offers, cursor }) => {
      const setValue = get().myOffers.setMyOffersValue;

      setValue({
        value: { data: offers },
        actionName: 'myOffers/setMyOffers',
        cursor,
      });
    },
    setHasMore: (hasMore: boolean) => {
      set(
        ({ myOffers }) => ({
          myOffers: {
            ...myOffers,
            hasMore,
          },
        }),
        false,
        'myOffers/setHasMore'
      );
    },
    setHasError: (hasError: boolean) => {
      set(
        ({ myOffers }) => ({
          myOffers: {
            ...myOffers,
            hasError,
          },
        }),
        false,
        'myOffers/setHasMore'
      );
    },
  },
});
