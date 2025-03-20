'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { getCurrentTradeFee, startTrade } from '@/services/trade';
import { useMutation, useQuery } from '@tanstack/react-query';

import { getOffer } from '@/services/offer';
import useApp from '../useApp';
import { useParams } from 'next/navigation';
import { useRootStore } from '@/store';
import useUser from '../useUser';

const useOffer = () => {
  const { isLoggedIn, user } = useUser();
  const {
    app: { currentPrice },
  } = useApp();
  const params = useParams();
  const id = params.id?.toString();
  const { offer } = useRootStore();

  const [fiatAmount, setFiatAmount] = useState(offer?.limitMin || 100);
  const [cryptocurrencyAmount, setCryptocurrencyAmount] = useState<number>();
  const [willReceiveFiat, setWillReceiveFiat] = useState<number | null>(null);

  const isTradeAvailability =
    isLoggedIn() &&
    cryptocurrencyAmount !== Infinity &&
    cryptocurrencyAmount !== null;

  const queryCurrentFee = useQuery({
    queryKey: ['currentFee'],
    queryFn: getCurrentTradeFee,
    retry: 3,
  });
  const queryOffer = useQuery({
    queryKey: ['offer', id],
    queryFn: async () => {
      if (id) {
        const data = await getOffer(id);
        return data;
      }
    },
    retry: 3,
    enabled: !!id,
  });
  const mutationStartTrade = useMutation({
    mutationFn: startTrade,
    mutationKey: ['startTrade'],
  });

  const calculateCryptocurrencyAmount = () => {
    if (fiatAmount && currentPrice) {
      const amount = fiatAmount / currentPrice;
      setCryptocurrencyAmount(amount);
    }
  };

  const handleFiatAmount = useCallback((amount: number): void => {
    setFiatAmount(amount);
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      cryptocurrencyAmount &&
      fiatAmount &&
      user &&
      user.id &&
      offer &&
      offer.fiat &&
      offer.id &&
      offer.vendor?.id &&
      offer.cryptocurrency?.id
    ) {
      mutationStartTrade.mutate({
        cryptocurrencyAmount,
        fiatAmount,
        offerId: offer.id,
        traderId: user.id,
        fiatId: offer.fiat?.id,
        vendorId: offer.vendor?.id,
        cryptocurrencyId: offer.cryptocurrency?.id,
      });
    }
  };

  useEffect(() => {
    if (queryOffer.data) {
      offer.setOffer(queryOffer.data);
    }
  }, [queryOffer.data]);

  useEffect(() => {
    calculateCryptocurrencyAmount();
  }, [fiatAmount, currentPrice]);

  return {
    offer,
    queryOffer,
    calculateCryptocurrencyAmount,
    handleFiatAmount,
    onSubmit,
    createTrade: {
      cryptocurrencyAmount,
      fiatAmount,
      willReceiveFiat,
      isTradeAvailability,
    },
  };
};

export default useOffer;
