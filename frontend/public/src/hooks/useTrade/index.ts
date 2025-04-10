'use client';

import { Status } from '@/store/trade/types';
import { getTrade } from '@/services/trade';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useRootStore } from '@/store';
import { useRouter } from '@/hooks';

const useTrade = () => {
  const params = useParams();
  const id = params.id?.toString();
  const { trade } = useRootStore();
  const { replace } = useRouter();

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
      if (queryTrade.data.status === Status.COMPLETED) {
        const redirectUrl = '/offer/' + trade.offer?.id;
        replace(redirectUrl, { scroll: true });
        return;
      }
      trade.setTrade(queryTrade.data);
    }
  }, [queryTrade.data]);

  const setPaid = (isPaid: boolean) => {
    trade.setTradeValue({
      paid: isPaid,
    });
  };

  const setCanceled = () => {
    trade.setTradeValue({
      status: Status.CANCELLED,
    });
  };

  return { queryTrade, trade, setPaid, setCanceled };
};

export default useTrade;
