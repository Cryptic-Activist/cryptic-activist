'use client';

import { getTrade } from '@/services/trade';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useRootStore } from '@/store';

const useTrade = () => {
  const params = useParams();
  const id = params.id?.toString();
  const { trade } = useRootStore();

  const queryTrade = useQuery({
    queryKey: ['trade', id],
    queryFn: async () => {
      if (id) {
        const data = await getTrade(id);
        return data;
      }
    },
    retry: 3,
    enabled: !!id,
  });

  useEffect(() => {
    if (queryTrade.data) {
      trade.setTrade(queryTrade.data);
    }
  }, [queryTrade.data]);

  const setTradeCreated = () => {
    trade.setTradeValue({
      status: 'IN_PROGRESS',
    });
  };

  const setPaid = (isPaid: boolean) => {
    trade.setTradeValue({
      paid: isPaid,
    });
  };

  const setCanceled = () => {
    trade.setTradeValue({
      status: 'CANCELLED',
    });
  };

  const setPaymentConfirmed = (hasReceived: boolean) => {
    trade.setTradeValue({
      status: hasReceived ? 'COMPLETED' : 'IN_PROGRESS',
      paymentConfirmed: hasReceived,
    });
  };

  const setVendorWalletAddress = (walletAddress: string) => {
    trade.setTradeValue({
      vendorWalletAddress: walletAddress,
    });
  };

  return {
    queryTrade,
    trade,
    setPaid,
    setCanceled,
    setPaymentConfirmed,
    setVendorWalletAddress,
    setTradeCreated,
  };
};

export default useTrade;
