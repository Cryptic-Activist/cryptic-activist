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

  return { queryTrade, trade };
};

export default useTrade;
