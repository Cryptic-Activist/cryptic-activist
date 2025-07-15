'use client';

import { getEscrowABI } from '@/services/ethers/escrow';
import { getPremiumABI } from '@/services/ethers/premium';
import { useEffect } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useRootStore } from '@/store';
import useUser from '../useUser';

const useABIs = (enabled = true) => {
  const { abis } = useRootStore();
  const { user } = useUser();

  const [escrowAbi, premiumAbi] = useQueries({
    queries: [
      {
        queryKey: ['escrowAbi'],
        queryFn: getEscrowABI,
        enabled: !!user.id && enabled,
      },
      {
        queryKey: ['premiumAbi'],
        queryFn: getPremiumABI,
        enabled: !!user.id && enabled,
      },
    ],
  });

  useEffect(() => {
    if (escrowAbi.data) {
      abis.setEscrowABI(escrowAbi.data);
    }
  }, [escrowAbi.data]);

  useEffect(() => {
    if (premiumAbi.data) {
      abis.setPremiumABI(premiumAbi.data);
    }
  }, [premiumAbi.data]);

  return { abis };
};

export default useABIs;
