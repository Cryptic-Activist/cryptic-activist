'use client';

import { useApp, useUser } from '@/hooks';

import { deleteOffer } from '@/services/offer';
import { fetchMyOffersPagination } from '@/services/myOffers';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRootStore } from '@/store';

const useMyOffers = () => {
  const { myOffers } = useRootStore();
  const { app } = useApp();
  const { user } = useUser();

  const initialFetch = async (userId: string) => {
    myOffers.setHasError(false);
    const newMyOffers = await fetchMyOffersPagination({
      userId,
      limit: 5,
      cursor: null,
      offerType: app.type,
    });
    if (newMyOffers.offers.length > 0) {
      const newMyOffersList = [...newMyOffers.offers];

      myOffers.setMyOffers({
        offers: newMyOffersList,
        cursor: newMyOffersList[newMyOffersList.length - 1].id,
      });
    } else {
      myOffers.setMyOffers({ offers: [], cursor: null });
    }
    myOffers.setHasMore(newMyOffers.nextCursor !== null);
  };

  const loadMore = async (userId: string) => {
    const newMyOffers = await fetchMyOffersPagination({
      userId,
      limit: 5,
      cursor: myOffers.cursor,
      offerType: app.type,
    });
    if (newMyOffers.myOffers.length > 0) {
      const newMyOffersList = [...myOffers.data, ...newMyOffers.myOffers];
      myOffers.setMyOffers({
        offers: newMyOffersList,
        cursor: newMyOffersList[newMyOffersList.length - 1].id,
      });
    } else {
      myOffers.setMyOffers({ offers: [], cursor: null });
    }
    myOffers.setHasMore(newMyOffers.nextCursor !== null);
  };

  const mutationInitialFetch = useMutation({
    mutationKey: ['initialFetch', 'myOffers'],
    mutationFn: async () => {
      if (user.id) {
        const data = await initialFetch(user.id);
        return data;
      }
    },
    retry: 3,
    onError: () => {
      myOffers.setHasError(true);
    },
  });

  const mutationLoadMore = useMutation({
    mutationKey: ['loadMore', 'myOffers'],
    mutationFn: async () => {
      if (user.id) {
        const data = await loadMore(user.id);
        return data;
      }
    },
    retry: 3,
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
        // return data;

        if (data) {
          await initialFetch(userId);
        }
      }
    },
    retry: 3,
  });

  const getOffer = (id: string) => {
    if (!myOffers.data) return null;

    const offer = myOffers.data.filter((f) => f.id === id);
    const hasFound = offer.length > 0;

    if (!hasFound) return null;

    return offer[0];
  };

  useEffect(() => {
    mutationInitialFetch.mutate();
  }, [user.id]);

  useEffect(() => {
    if (user.id && app.type) {
      mutationInitialFetch.mutate();
    }
  }, [app.type, user.id]);

  return {
    myOffers,
    setMyOffers: myOffers.setMyOffers,
    getOffer,
    loadMore: mutationLoadMore.mutate,
    initialFetch: mutationInitialFetch.mutate,
    deleteOffer: mutationDeleteOffer.mutateAsync,
  };
};

export default useMyOffers;
