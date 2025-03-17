'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { fetchOffers } from '@/services/offers';
import { toLowerCase } from '@/utils';
import { useApp } from '@/hooks';
import { useRootStore } from '@/store';

const useOffers = () => {
  const { offers } = useRootStore();
  const [offersList, setOffersList] = useState(offers.data);
  const { app } = useApp();

  const mutationOffers = useMutation({
    mutationKey: ['offers'],
    mutationFn: fetchOffers,
    onSuccess: (data) => {
      offers.setOffers(data);
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

  useEffect(() => {
    if (
      app.defaults.cryptocurrency?.id &&
      app.defaults.fiat?.id &&
      // app.defaults.paymentMethod?.id &&
      app.type
    ) {
      mutationOffers.mutate({
        cryptocurrencyId: app.defaults.cryptocurrency?.id,
        fiatId: app.defaults.fiat?.id,
        // paymentMethodId: app.defaults.paymentMethod?.id,
        offerType: app.type,
      });
    }
  }, [
    app.defaults.cryptocurrency?.id,
    app.defaults.fiat?.id,
    app.defaults.paymentMethod?.id,
    app.type,
  ]);

  return {
    offers,
    offersList,
    setOffers: offers.setOffers,
    getOffer,
    filterOffers,
  };
};

export default useOffers;
