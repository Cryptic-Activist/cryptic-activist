'use client';

import { Period } from './types';
import { subscribeToPremium } from '@/services/premium';
import useBlockchain from '../useBlockchain';
import { useMutation } from '@tanstack/react-query';
import useUser from '../useUser';

const usePremium = () => {
  const { user } = useUser();
  const {
    blockchain: { account },
  } = useBlockchain();

  const subscribeToPremiumMutation = useMutation({
    mutationKey: ['subscribePremium'],
    mutationFn: async (period: Period) => {
      if (user.id && account?.address) {
        const response = await subscribeToPremium(
          user.id,
          period,
          account?.address
        );
        return response;
      }
    },
  });

  return { isPremium: user?.isPremium, subscribeToPremiumMutation };
};

export default usePremium;
