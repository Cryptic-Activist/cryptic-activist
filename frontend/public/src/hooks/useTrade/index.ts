'use client';

import {
  SetPaymentConfirmedParams,
  SetPaymentDisputedParams,
  SetTradeCancelledParams,
} from './types';

import { getTrade } from '@/services/trade';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useRootStore } from '@/store';
import useUser from '../useUser';

const useTrade = () => {
  const { user } = useUser();
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
    enabled: !!user.id && !!id,
    refetchOnMount: 'always',
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (queryTrade.data) {
      trade.setTrade(queryTrade.data);
    }
  }, [queryTrade.data]);

  const setTradeCreated = async () => {
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
    trade.setTradeValue({
      status: params.paymentConfirmedAt ? 'COMPLETED' : 'IN_PROGRESS',
      paymentConfirmedAt: params.paymentConfirmedAt,
      endedAt: params.endedAt,
      escrowReleasedAt: params.escrowReleasedAt,
    });
  };

  const setDisputed = (params: SetPaymentDisputedParams) => {
    trade.setTradeValue({
      status: params.status,
      disputedAt: params.disputedAt,
    });
  };

  const setVendorWalletAddress = (walletAddress: string) => {
    trade.setTradeValue({
      vendorWalletAddress: walletAddress,
    });
  };

  useEffect(() => {
    return () => {
      trade.resetTrade();
    };
  }, []);

  return {
    queryTrade,
    trade,
    setPaid,
    setCanceled,
    setPaymentConfirmed,
    setVendorWalletAddress,
    setTradeCreated,
    setDisputed,
  };
};

export default useTrade;
