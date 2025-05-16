'use client';

import { FormEvent, useEffect, useState } from 'react';
import { getCurrentTradingFee, startTrade } from '@/services/trade';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

import { fetchCurrentPrice } from '@/services/app';
import { getOffer } from '@/services/offer';
import useApp from '../useApp';
import useBlockchain from '../useBlockchain';
import useDebounce from '../useDebounce';
import useNavigationBar from '../useNavigationBar';
import useNotification from '../useNotification';
import { useRootStore } from '@/store';
import useUser from '../useUser';

const useOffer = () => {
  const params = useParams();
  const id = params.id?.toString();
  const router = useRouter();

  const { isLoggedIn, user } = useUser();
  const { addToast } = useApp();
  const { notifications } = useNotification();
  const { blockchain } = useBlockchain();
  const { toggleModal } = useNavigationBar();

  const { offer } = useRootStore();

  const [localCurrentPrice, setLocalCurrentPrice] = useState();
  const [fiatAmount, setFiatAmount] = useState(offer?.limitMin || 100);
  const [cryptocurrencyAmount, setCryptocurrencyAmount] = useState<number>();
  const [receivingFiatAmount, setReceivingFiatAmount] = useState<number | null>(
    null
  );
  const [isTradingAvailable, setIsTradingAvailable] = useState(false);

  const mutationCurrentTradingFee = useMutation({
    mutationKey: ['currentFee'],
    mutationFn: getCurrentTradingFee,
    retry: 3,
    onSuccess: (data) => {
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
    onSuccess: (data) => {
      router.push('/trade/' + data.trade.id);
    },
  });
  const mutationCurrentPrice = useMutation({
    mutationKey: [
      'currentPrice',
      offer.fiat?.symbol,
      offer.cryptocurrency?.coingeckoId,
    ],
    mutationFn: ({ id, fiatSymbol }: { id: string; fiatSymbol: string }) =>
      fetchCurrentPrice(id, fiatSymbol),
    onSuccess: (data) => {
      setLocalCurrentPrice(data.price);
    },
  });

  const calculateCryptocurrencyAmount = () => {
    if (fiatAmount && localCurrentPrice) {
      const amount = fiatAmount / localCurrentPrice;
      const rounded = parseFloat(amount.toFixed(8));
      setCryptocurrencyAmount(rounded);
    }
  };

  const handleFiatAmount = useDebounce((amount: number): void => {
    setFiatAmount(amount);
  }, 400);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isTradingAvailable) {
      if (
        cryptocurrencyAmount &&
        fiatAmount &&
        user &&
        user.id &&
        offer &&
        offer.fiat &&
        offer.id &&
        offer.vendor?.id &&
        offer.cryptocurrency?.id &&
        offer.paymentMethod?.id &&
        blockchain.account?.address
      ) {
        const newTrade = await mutationStartTrade.mutateAsync({
          cryptocurrencyAmount,
          fiatAmount,
          offerId: offer.id,
          traderId: user.id,
          fiatId: offer.fiat?.id,
          vendorId: offer.vendor?.id,
          cryptocurrencyId: offer.cryptocurrency?.id,
          paymentMethodId: offer.paymentMethod.id,
          traderWalletAddress: blockchain.account.address,
        });
        notifications.socket?.emit('notification_trade_start_sent', {
          tradeId: newTrade.trade.id,
        });
      } else {
        addToast('error', 'Unable to start trading', 5000);
      }
    } else {
      if (!isLoggedIn()) {
        toggleModal('login');
        return;
      }
      if (user.id === offer.vendor?.id) {
        return;
      }
      if (user.id !== offer.vendor?.id && !blockchain.account?.address) {
        toggleModal('blockchain');
        return;
      }
    }
  };

  useEffect(() => {
    if (queryOffer.data) {
      offer.setOffer(queryOffer.data);
    }
  }, [queryOffer.data]);

  useEffect(() => {
    calculateCryptocurrencyAmount();
  }, [fiatAmount, localCurrentPrice]);

  useEffect(() => {
    if (
      user.id &&
      offer.cryptocurrency?.id &&
      offer.fiat?.id &&
      fiatAmount &&
      localCurrentPrice
    ) {
      mutationCurrentTradingFee.mutate({
        cryptocurrencyId: offer.cryptocurrency.id,
        fiatAmount,
        fiatId: offer.fiat.id,
        userId: user.id,
        currentPrice: localCurrentPrice,
      });
    }
  }, [
    user.id,
    offer.cryptocurrency?.id,
    offer.fiat?.id,
    fiatAmount,
    localCurrentPrice,
  ]);

  useEffect(() => {
    if (
      isLoggedIn() &&
      user.id &&
      offer.vendor?.id &&
      blockchain.account?.address &&
      cryptocurrencyAmount
    ) {
      setIsTradingAvailable(true);
    } else {
      setIsTradingAvailable(false);
    }
  }, [user.id, offer.vendor?.id, isLoggedIn, blockchain]);

  useEffect(() => {
    if (offer.fiat?.symbol && offer.cryptocurrency?.coingeckoId) {
      mutationCurrentPrice.mutate({
        fiatSymbol: offer.fiat.symbol,
        id: offer.cryptocurrency.coingeckoId,
      });
    }
  }, [offer.fiat?.symbol, offer.cryptocurrency?.coingeckoId, fiatAmount]);

  return {
    offer,
    queryOffer,
    calculateCryptocurrencyAmount,
    handleFiatAmount,
    onSubmit,
    isLoggedIn,
    mutationStartTrade,
    localCurrentPrice,
    createTrade: {
      cryptocurrencyAmount,
      fiatAmount,
      receivingFiatAmount,
      isTradingAvailable,
    },
  };
};

export default useOffer;
