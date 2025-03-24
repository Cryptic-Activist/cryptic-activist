'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { getCurrentTradingFee, startTrade } from '@/services/trade';
import { useMutation, useQuery } from '@tanstack/react-query';

import { getOffer } from '@/services/offer';
import useApp from '../useApp';
import useDebounce from '../useDebounce';
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
  const [receivingFiatAmount, setReceivingFiatAmount] = useState<number | null>(
    null
  );

  const mutationCurrentTradingFee = useMutation({
    mutationKey: ['currentFee'],
    mutationFn: getCurrentTradingFee,
    retry: 3,
    onSuccess: (data) => {
      console.log({ data });
      setReceivingFiatAmount(data.finalFiatAmount);
      setCryptocurrencyAmount(data.finalCryptoAmount);
    },
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
      const rounded = parseFloat(amount.toFixed(8));
      setCryptocurrencyAmount(rounded);
    }
  };

  const handleFiatAmount = useDebounce((amount: number): void => {
    setFiatAmount(amount);
  }, 1500);

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

  useEffect(() => {
    if (
      user.id &&
      offer.cryptocurrency?.id &&
      offer.fiat?.id &&
      fiatAmount &&
      currentPrice
    ) {
      mutationCurrentTradingFee.mutate({
        cryptocurrencyId: offer.cryptocurrency.id,
        fiatAmount,
        fiatId: offer.fiat.id,
        userId: user.id,
        currentPrice,
      });
    }
  }, [
    user.id,
    offer.cryptocurrency?.id,
    offer.fiat?.id,
    fiatAmount,
    currentPrice,
  ]);

  return {
    offer,
    queryOffer,
    calculateCryptocurrencyAmount,
    handleFiatAmount,
    onSubmit,
    createTrade: {
      cryptocurrencyAmount,
      fiatAmount,
      receivingFiatAmount,
    },
  };
};

export default useOffer;
