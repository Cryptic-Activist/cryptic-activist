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
        const trades = await getTradesByUser(user.id, as);
        return trades;
      }
    },
    onSuccess: (data) => {
      trades.setTradeValue(data);
    },
  });

  useEffect(() => {
    if (user.id) {
      console.log({ as });
      mutation.mutate();
    }
  }, [user.id, as]);

  const toggleAs = () => {
    setAs((prev) => {
      const newState = prev === 'trader' ? 'vendor' : 'trader';
      return newState;
    });
  };

  return {
    trades,
    toggleAs,
    as,
  };
};

export default useTrades;
