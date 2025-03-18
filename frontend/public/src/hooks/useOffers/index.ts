'use client';

import { useApp, useUser } from '@/hooks';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { Console } from 'console';
import { FetchOffersParams } from '@/services/offers/types';
import { fetchOffersPagination } from '@/services/offers';
import { useRootStore } from '@/store';

const useOffers = () => {
  const { offers } = useRootStore();
  const { app } = useApp();
  const { user } = useUser();

  const [offersList, setOffersList] = useState(offers.data);

  const mutationOffers = useMutation({
    mutationKey: ['offers'],
    mutationFn: fetchOffersPagination,
    onSuccess: (data) => {
      offers.setOffers({ offers: data.offers, cursor: data.nextCursor });
      setOffersList(data);
    },
  });

  const getOffer = (id: string) => {
    if (!offers.data) return null;

    const offer = offers.data.filter((f) => f.id === id);
    const hasFound = offer.length > 0;

    if (!hasFound) return null;

    return offer[0];
  };

  const filterOffers = (term: string) => {
    if (!offers.data) return;
    // const filtered = offers.data.filter((offer) => {
    //   const lowerOfferName = toLowerCase(offer.label);
    //   const lowerOfferSymbol = toLowerCase(offer.symbol);
    //   const lowerTerm = toLowerCase(term);

    //   return (
    //     lowerOfferName.includes(lowerTerm) ||
    //     lowerOfferSymbol.includes(lowerTerm) ||
    //     `${lowerOfferSymbol} - ${lowerOfferName}`.includes(lowerTerm)
    //   );
    // });

    // setOffersList(filtered);
  };

  const initialFetch = async () => {
    const newOffers = await fetchOffersPagination({
      cryptocurrencyId: app.defaults.cryptocurrency?.id,
      fiatId: app.defaults.fiat?.id,
      // paymentMethodId: app.defaults.paymentMethod?.id,
      offerType: app.type,
      excludedVendorId: user.id,
      limit: 5,
      cursor: null,
    });
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
      // paymentMethodId: app.defaults.paymentMethod?.id,
      offerType: app.type,
      excludedVendorId: user.id,
      limit: 5,
      cursor: offers.cursor,
    });
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

  useEffect(() => {
    if (
      app.defaults.cryptocurrency?.id &&
      app.defaults.fiat?.id &&
      // app.defaults.paymentMethod?.id &&
      app.type
    ) {
      initialFetch();
    }
  }, [
    app.defaults.cryptocurrency?.id,
    app.defaults.fiat?.id,
    app.defaults.paymentMethod?.id,
    app.type,
    user.id,
  ]);

  return {
    offers,
    offersList,
    setOffers: offers.setOffers,
    getOffer,
    filterOffers,
    loadMore,
    initialFetch,
  };
};

export default useOffers;
