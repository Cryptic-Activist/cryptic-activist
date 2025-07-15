'use client';

import { getAllTiers } from '@/services/tiers';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRootStore } from '@/store';

const useTiers = (enabled = true) => {
  const { tiers } = useRootStore();

  const tiersQuery = useQuery({
    queryKey: ['tiers'],
    queryFn: getAllTiers,
    enabled: enabled,
  });

  useEffect(() => {
    if (tiersQuery.data) {
      tiers.getTiers({ data: tiersQuery.data });
    }
  }, [tiersQuery.data]);

  return { tiers };
};

export default useTiers;
