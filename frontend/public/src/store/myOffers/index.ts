import { MyOffersStore } from './types';
import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';

export const useMyOffersSlice: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  MyOffersStore
> = (set, _get) => ({
  myOffers: {
    data: [],
    currentPage: 1,
    totalPages: 1,
    pageSize: 5,
    hasError: false,
    setMyOffersValue: (value, actionName = 'myOffers/setValue') => {
      set(
        ({ myOffers }) => ({
          myOffers: {
            ...myOffers,
            data: value.data ?? myOffers.data,
            totalPages: value.totalPages ?? myOffers.totalPages,
            currentPage: value.currentPage ?? myOffers.currentPage,
            pageSize: value.pageSize ?? myOffers.pageSize,
          },
        }),
        false,
        actionName
      );
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
