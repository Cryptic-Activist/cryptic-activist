'use client';

import { useApp, useUser } from '@/hooks';

import { deleteOffer } from '@/services/offer';
import { fetchMyOffersPagination } from '@/services/myOffers';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRootStore } from '@/store';

const useMyOffers = () => {
  const { myOffers } = useRootStore();
  const { user } = useUser();
  const {
    app: { type },
  } = useApp();

  const mutation = useMutation({
    mutationKey: ['myOffers'],
    mutationFn: async () => {
      if (user.id) {
        const myOfferList = await fetchMyOffersPagination({
          userId: user.id,
          page: myOffers.currentPage,
          pageSize: myOffers.pageSize,
          offerType: type,
        });
        return myOfferList;
      }
    },
    onSuccess: (response) => {
      myOffers.setMyOffersValue({
        data: response.data,
        totalPages: response.totalPages,
        currentPage: response.currentPage,
        pageSize: response.pageSize,
      });
    },
  });

  const mutationDeleteOffer = useMutation({
    mutationKey: ['deleteMyOffer'],
    mutationFn: async ({
      userId,
      offerId,
    }: {
      userId: string;
      offerId: string;
    }) => {
      if (userId && offerId) {
        const data = await deleteOffer(userId, offerId);
        return data;
      }
    },
    onSuccess: () => {
      mutation.mutate();
    },
    retry: 3,
  });

  useEffect(() => {
    if (user.id) {
      mutation.mutate();
    }
  }, [
    user.id,
    myOffers.pageSize,
    myOffers.currentPage,
    myOffers.totalPages,
    type,
  ]);

  const onChangePage = (page: number) => {
    myOffers.setMyOffersValue({ currentPage: page }, 'myOffers/setCurrentPage');
  };

  return {
    myOffers,
    onChangePage,
    mutationDeleteOffer,
  };
};

export default useMyOffers;
