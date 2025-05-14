'use client';

import {
  fetchOffersPagination,
  fetchOffersPaymentMethods,
} from '@/services/offers';
import { useApp, useUser } from '@/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useEffect } from 'react';
import { useRootStore } from '@/store';

const useOffers = () => {
  const { offers } = useRootStore();
  const { app } = useApp();
  const { user } = useUser();

  const initialFetch = async () => {
    offers.setHasError(false);
    const newOffers = await fetchOffersPagination({
      cryptocurrencyId: app.defaults.cryptocurrency?.id,
      fiatId: app.defaults.fiat?.id,
      paymentMethodIds: offers.selectedPaymentMethodIds.join(','),
      amount: app.defaults.amount,
      offerType: app.type,
      excludedVendorId: user.id,
      limit: 5,
      cursor: null,
    });
    console.log({ newOffers });
    if (newOffers.offers.length > 0) {
      const newOffersList = [...newOffers.offers];

      offers.setOffers({
        offers: newOffersList,
        cursor: newOffersList[newOffersList.length - 1].id,
      });
    } else {
      offers.setOffers({ offers: [], cursor: null });
    }
    offers.setHasMore(newOffers.nextCursor !== null);
  };

  const loadMore = async () => {
    const newOffers = await fetchOffersPagination({
      cryptocurrencyId: app.defaults.cryptocurrency?.id,
      fiatId: app.defaults.fiat?.id,
      paymentMethodIds: offers.selectedPaymentMethodIds.join(','),
      offerType: app.type,
      excludedVendorId: user.id,
      limit: 5,
      cursor: offers.cursor,
    });
    console.log({ newOfferLoadMore: newOffers });
    if (newOffers.offers.length > 0) {
      const newOffersList = [...offers.data, ...newOffers.offers];
      offers.setOffers({
        offers: newOffersList,
        cursor: newOffersList[newOffersList.length - 1].id,
      });
    } else {
      offers.setOffers({ offers: [], cursor: null });
    }
    offers.setHasMore(newOffers.nextCursor !== null);
  };

  const mutationInitialFetch = useMutation({
    mutationKey: ['initialFetch', 'offers'],
    mutationFn: initialFetch,
    retry: 3,
    onError: () => {
      offers.setHasError(true);
    },
  });

  const mutationLoadMore = useMutation({
    mutationKey: ['loadMore', 'offers'],
    mutationFn: loadMore,
    retry: 3,
  });

  const offerPaymentMethodsQuery = useQuery({
    queryKey: ['offersPaymentMethods'],
    queryFn: fetchOffersPaymentMethods,
  });

  const getOffer = (id: string) => {
    if (!offers.data) return null;

    const offer = offers.data.filter((f) => f.id === id);
    const hasFound = offer.length > 0;

    if (!hasFound) return null;

    return offer[0];
  };

  useEffect(() => {
    if (app.defaults.cryptocurrency?.id && app.defaults.fiat?.id && app.type) {
      mutationInitialFetch.mutate();
    }
  }, [
    app.defaults.cryptocurrency?.id,
    app.defaults.fiat?.id,
    offers.selectedPaymentMethodIds,
    app.defaults.amount,
    app.type,
    user.id,
  ]);

  useEffect(() => {
    if (offerPaymentMethodsQuery.data) {
      offers.setPaymentMethods({
        paymentMethods: offerPaymentMethodsQuery.data,
      });
    }
  }, [offerPaymentMethodsQuery.data]);

  return {
    offers,
    setOffers: offers.setOffers,
    getOffer,
    loadMore: mutationLoadMore.mutate,
    initialFetch: mutationInitialFetch.mutate,
  };
};

export default useOffers;
