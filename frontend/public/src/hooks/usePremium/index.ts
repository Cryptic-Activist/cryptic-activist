'use client';

import { Period } from './types';
import { subscribeToPremium } from '@/services/premium';
import { useMutation } from '@tanstack/react-query';
import useUser from '../useUser';

const usePremium = () => {
  const { user } = useUser();

  const subscribeToPremiumMutation = useMutation({
    mutationKey: ['subscribePremium'],
    mutationFn: async (period: Period) => {
      if (user.id) {
        const response = await subscribeToPremium(user.id, period);
        return response;
      }
    },
  });

  return { isPremium: user?.isPremium, subscribeToPremiumMutation };
};

export default usePremium;
