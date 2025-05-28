'use client';

import { useEffect, useState } from 'react';

import { GetTradesByUserAs } from '@/services/trades/types';
import { getTradesByUser } from '@/services/trades';
import { useMutation } from '@tanstack/react-query';
import { useRootStore } from '@/store';
import useUser from '../useUser';

const useTrades = () => {
  const [as, setAs] = useState<GetTradesByUserAs>('vendor');

  const { user } = useUser();
  const { trades } = useRootStore();
  const mutation = useMutation({
    mutationKey: ['trades'],
    mutationFn: async () => {
      if (user.id) {
        const tradesList = await getTradesByUser({
          as,
          userId: user.id,
          page: trades.currentPage,
          pageSize: trades.pageSize,
        });
        return tradesList;
      }
    },
    onSuccess: (response) => {
      trades.setTradeValue({
        data: response.data,
        totalPages: response.totalPages,
        currentPage: response.currentPage,
        pageSize: response.pageSize,
      });
    },
  });

  useEffect(() => {
    if (user.id) {
      mutation.mutate();
    }
  }, [user.id, as, trades.pageSize, trades.currentPage, trades.totalPages]);

  const toggleAs = () => {
    setAs((prev) => {
      const newState = prev === 'trader' ? 'vendor' : 'trader';
      return newState;
    });
    trades.setTradeValue({ currentPage: 1, pageSize: 10, totalPages: 1 });
  };

  const onChangePage = (page: number) => {
    trades.setTradeValue({ currentPage: page }, 'trades/setCurrentPage');
  };

  return {
    trades,
    toggleAs,
    as,
    onChangePage,
  };
};

export default useTrades;
