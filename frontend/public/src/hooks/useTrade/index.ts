'use client';

import { SetPaymentConfirmedParams, SetTradeCancelledParams } from './types';

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
        trade.resetTrade();
        const data = await getTrade(id);
        return data;
      }
    },
    retry: 3,
    enabled: !!id,
    refetchOnMount: 'always',
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

  const setPaid = (paidAt: string) => {
    trade.setTradeValue({
      paidAt,
    });
  };

  const setCanceled = (params: SetTradeCancelledParams) => {
    trade.setTradeValue({
      status: 'CANCELLED',
      endedAt: params.endedAt,
    });
  };

  const setPaymentConfirmed = (params: SetPaymentConfirmedParams) => {
    console.log({ params });
    trade.setTradeValue({
      status: params.paymentConfirmedAt ? 'COMPLETED' : 'IN_PROGRESS',
      paymentConfirmedAt: params.paymentConfirmedAt,
      endedAt: params.endedAt,
      escrowReleasedAt: params.escrowReleasedAt,
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
